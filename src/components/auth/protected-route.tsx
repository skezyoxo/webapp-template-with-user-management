'use client';

import { useAuth } from '@/contexts/auth.context';
import { Resource, Action } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    resource: Resource;
    action: Action;
    fallback?: React.ReactNode;
}

export function ProtectedRoute({
    children,
    resource,
    action,
    fallback = <div>Access Denied</div>,
}: ProtectedRouteProps) {
    const { authState, checkPermission } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authState.isLoading && !authState.user) {
            router.push('/auth/signin');
        }
    }, [authState.isLoading, authState.user, router]);

    if (authState.isLoading) {
        return <div>Loading...</div>;
    }

    if (!authState.user) {
        return null;
    }

    if (!checkPermission(resource, action)) {
        return fallback;
    }

    return <>{children}</>;
} 