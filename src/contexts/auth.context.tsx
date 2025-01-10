'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { AuthState, UserWithRole, Resource, Action } from '@/types';

interface AuthContextType {
  authState: AuthState;
  checkPermission: (resource: Resource, action: Action) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    setAuthState({
      user: session?.user as UserWithRole | null,
      isLoading: status === 'loading',
      error: status === 'unauthenticated' ? 'Not authenticated' : undefined,
    });
  }, [session, status]);

  const checkPermission = (resource: Resource, action: Action): boolean => {
    if (!authState.user?.role?.permissions) return false;
    return authState.user.role.permissions.some(
      permission => permission.resource === resource && permission.action === action
    );
  };

  return (
    <AuthContext.Provider value={{ authState, checkPermission }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function usePermission(resource: Resource, action: Action): boolean {
  const { authState, checkPermission } = useAuth();
  return checkPermission(resource, action);
}

export function useAuthorize(resource: Resource, action: Action): boolean {
  const hasPermission = usePermission(resource, action);
  if (!hasPermission) {
    throw new Error('Unauthorized');
  }
  return true;
}
