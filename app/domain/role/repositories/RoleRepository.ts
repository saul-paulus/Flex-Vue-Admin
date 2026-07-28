/**
 * RoleRepository Interface — Domain contract for role operations.
 */
import type { RoleModel } from '../models/RoleModel';
import type { PermissionGroup, RoleMatrixItem } from '../entities/Role';
import type { Result } from '~/domain/core/Result';
import type { AppError } from '~/domain/core/AppError';

export interface RolesListResult {
  readonly roles: readonly RoleModel[];
  readonly permissionGroups: readonly PermissionGroup[];
}

export interface RoleRepository {
  /**
   * Fetch all roles and permission groups.
   */
  getRoles(): Promise<Result<RolesListResult, AppError>>;

  /**
   * Save the permission matrix for a role.
   */
  saveRolePermissions(roleId: number, matrix: Record<string, RoleMatrixItem>): Promise<Result<boolean, AppError>>;
}
