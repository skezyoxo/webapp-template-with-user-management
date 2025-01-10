import { NextResponse } from 'next/server';
import { PrismaClient, RolePermission, Permission } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { withErrorHandler } from '@/utils/api-middleware';
import { logAuditEvent, AuditActions, getClientInfo } from '@/utils/audit-logger';
import { UnauthorizedError, ForbiddenError } from '@/utils/errors';

const prisma = new PrismaClient();

type RolePermissionWithPermission = RolePermission & {
  permission: Permission;
};

async function handler(req: Request, context: { params: Record<string, string | string[]> }) {
  // Only allow PUT requests
  if (req.method !== 'PUT') {
    return new NextResponse(null, { status: 405 });
  }

  const targetUserId = context.params.id;
  if (!targetUserId || Array.isArray(targetUserId)) {
    throw new Error('Invalid user ID');
  }

  const session = await getServerSession();
  if (!session?.user?.email) {
    throw new UnauthorizedError('Not authenticated');
  }

  // Check if user has permission to modify user permissions
  const adminUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  if (!adminUser) {
    throw new UnauthorizedError('User not found');
  }

  const hasPermission = adminUser.role?.permissions?.some(
    (rp: RolePermissionWithPermission) => rp.permission.name === 'MANAGE_USER_PERMISSIONS'
  );

  if (!hasPermission) {
    throw new ForbiddenError('Not authorized to modify user permissions');
  }

  const { permissions } = await req.json();

  // Get the previous permissions for audit log
  const previousPermissions = await prisma.user.findUnique({
    where: { id: targetUserId },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  if (!previousPermissions) {
    throw new ForbiddenError('Target user not found');
  }

  // Update user permissions
  const updatedUser = await prisma.user.update({
    where: { id: targetUserId },
    data: {
      role: {
        connect: { id: permissions.roleId },
      },
    },
    include: { role: true },
  });

  // Log the permission change
  await logAuditEvent({
    userId: adminUser.id,
    action: AuditActions.PERMISSION_CHANGE,
    resource: `user/${targetUserId}`,
    details: {
      previousRole: previousPermissions.role?.name,
      newRole: updatedUser.role.name,
      targetUserId,
    },
    ...getClientInfo(req),
  });

  return NextResponse.json(updatedUser);
}

export const PUT = withErrorHandler(handler);
