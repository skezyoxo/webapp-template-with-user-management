import { UserWithRole, PermissionCheck, Resource, Action } from '../types/auth.types';
import { ForbiddenError } from './errors';

/**
 * Check if a user has a specific permission
 */
export function hasPermission(user: UserWithRole, check: PermissionCheck): boolean {
    if (!user || !user.role || !user.role.permissions) {
        return false;
    }

    return user.role.permissions.some(
        (permission) =>
            permission.resource === check.resource && permission.action === check.action
    );
}

/**
 * Check multiple permissions at once
 */
export function hasPermissions(user: UserWithRole, checks: PermissionCheck[]): boolean {
    return checks.every((check) => hasPermission(user, check));
}

/**
 * Verify permission and return boolean
 */
export function checkPermission(
    user: UserWithRole | null | undefined,
    resource: Resource,
    action: Action
): boolean {
    if (!user) return false;
    return hasPermission(user, { resource, action });
}

/**
 * Require permission or throw error
 */
export function requirePermission(
    user: UserWithRole | null | undefined,
    resource: Resource,
    action: Action
): void {
    if (!checkPermission(user, resource, action)) {
        throw new ForbiddenError(`Missing required permission: ${action} ${resource}`);
    }
}

/**
 * Check if user has admin access to a resource
 */
export function hasResourceAccess(
    user: UserWithRole,
    resource: Resource
): boolean {
    return ['create', 'read', 'update', 'delete'].every((action) =>
        hasPermission(user, { resource, action: action as Action })
    );
}