import { User, Role, Permission, Session } from '@prisma/client';

// Base types from Prisma
export type { User, Role, Permission, Session };

// Extended User type without sensitive information
export type SafeUser = Omit<User, 'passwordHash'>;

// Session with user information
export interface AuthSession extends Session {
    user: SafeUser;
}

// Role-based types
export interface UserWithRole extends SafeUser {
    role: Role & {
        permissions: Array<Permission>;
    };
}

// Permission checking types
export type Resource = 'users' | 'roles' | 'permissions';
export type Action = 'create' | 'read' | 'update' | 'delete';

export interface PermissionCheck {
    resource: Resource;
    action: Action;
}

// Auth state types
export interface AuthState {
    user: UserWithRole | null;
    isLoading: boolean;
    error?: string;
}

// Role-based operation result
export interface RoleOperationResult<T = void> {
    success: boolean;
    data?: T;
    error?: string;
    code?: string;
} 