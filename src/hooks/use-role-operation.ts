import { useState } from 'react';
import { RoleOperationResult, PermissionCheck } from '@/types';
import { useAuth } from '@/contexts/auth.context';

export function useRoleOperation() {
  const { checkPermission } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  async function executeOperation<T>(
    permissionCheck: PermissionCheck,
    operation: () => Promise<T>
  ): Promise<RoleOperationResult<T>> {
    try {
      setIsLoading(true);

      // Check permission first
      if (!checkPermission(permissionCheck.resource, permissionCheck.action)) {
        return {
          success: false,
          error: 'Permission denied',
          code: 'PERMISSION_DENIED',
        };
      }

      // Execute the operation
      const result = await operation();

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        code: 'OPERATION_FAILED',
      };
    } finally {
      setIsLoading(false);
    }
  }

  return {
    executeOperation,
    isLoading,
  };
}
