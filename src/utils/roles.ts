import { PrismaClient, Role, User } from '@prisma/client';
import { RoleOperationResult } from '../types/auth.types';
import { ValidationError, NotFoundError } from './errors';

const prisma = new PrismaClient();

/**
 * Validate role name
 */
export function validateRoleName(name: string): boolean {
    return /^[a-zA-Z0-9_-]{3,50}$/.test(name);
}

/**
 * Get role by ID
 */
export async function getRoleById(id: string): Promise<Role | null> {
    return prisma.role.findUnique({
        where: { id },
        include: { permissions: true }
    });
}

/**
 * Assign role to user
 */
export async function assignRole(
    userId: string,
    roleId: string
): Promise<RoleOperationResult<User>> {
    try {
        const role = await getRoleById(roleId);
        if (!role) {
            throw new NotFoundError('Role not found');
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: { roleId }
        });

        return {
            success: true,
            data: user
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to assign role',
            code: error instanceof Error ? error.name : 'UNKNOWN_ERROR'
        };
    }
}

/**
 * Get default role
 */
export async function getDefaultRole(): Promise<Role | null> {
    return prisma.role.findFirst({
        where: { isDefault: true },
        include: { permissions: true }
    });
}

/**
 * Create new role with permissions
 */
export async function createRole(
    name: string,
    description: string | null,
    permissionIds: string[]
): Promise<RoleOperationResult<Role>> {
    try {
        if (!validateRoleName(name)) {
            throw new ValidationError('Invalid role name format');
        }

        const role = await prisma.role.create({
            data: {
                name,
                description,
                permissions: {
                    create: permissionIds.map(permissionId => ({
                        permission: { connect: { id: permissionId } }
                    }))
                }
            },
            include: { permissions: true }
        });

        return {
            success: true,
            data: role
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create role',
            code: error instanceof Error ? error.name : 'UNKNOWN_ERROR'
        };
    }
} 