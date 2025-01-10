import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { withErrorHandler } from '@/utils/api-middleware';
import { logAuditEvent, AuditActions, getClientInfo } from '@/utils/audit-logger';
import { UnauthorizedError, ForbiddenError } from '@/utils/errors';

const prisma = new PrismaClient();

async function handler(req: Request, { params }: { params: { id: string } }) {
  // Only allow PUT requests
  if (req.method !== 'PUT') {
    return new NextResponse(null, { status: 405 });
  }

  const session = await getServerSession();
  if (!session?.user) {
    throw new UnauthorizedError('Not authenticated');
  }

  // Check if user has permission to modify user permissions
  const adminUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { role: { include: { permissions: true } } },
  });

  if (!adminUser?.role?.permissions?.some(p => p.name === 'MANAGE_USER_PERMISSIONS')) {
    throw new ForbiddenError('Not authorized to modify user permissions');
  }

  const { permissions } = await req.json();
  const targetUserId = params.id;

  // Get the previous permissions for audit log
  const previousPermissions = await prisma.user.findUnique({
    where: { id: targetUserId },
    include: { role: { include: { permissions: true } } },
  });

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
      previousRole: previousPermissions?.role?.name,
      newRole: updatedUser.role.name,
      targetUserId,
    },
    ...getClientInfo(req),
  });

  return NextResponse.json(updatedUser);
}

export const PUT = withErrorHandler(handler);
