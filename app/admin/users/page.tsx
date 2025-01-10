'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { useRoleOperation } from '@/hooks/use-role-operation';
import { UserWithRole } from '@/types';
import { useEffect, useState } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const { executeOperation, isLoading } = useRoleOperation();

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await executeOperation({ resource: 'users', action: 'read' }, async () => {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      });

      if (result.success && result.data) {
        setUsers(result.data);
      }
    };

    fetchUsers();
  }, [executeOperation]);

  return (
    <ProtectedRoute resource="users" action="read">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>

        {isLoading ? (
          <div>Loading users...</div>
        ) : (
          <div className="grid gap-4">
            {users.map(user => (
              <div key={user.id} className="p-4 border rounded">
                <h2 className="font-semibold">{user.displayName || user.email}</h2>
                <p className="text-sm text-gray-600">Role: {user.role.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
