/**
 * RoleRepository Interface — Domain contract for role operations.
 */
import type { RoleModel, PermissionGroup, RoleMatrixItem } from '../entities/Role';
import type { Result } from '@domain/shared/value-objects/Result';
import type { AppError } from '@domain/shared/exceptions/AppError';

export interface RolesListResult {
  readonly roles: readonly RoleModel[];
  readonly permissionGroups: readonly PermissionGroup[];
}

export interface RoleRepository {
  getRoles(): Promise<Result<RolesListResult, AppError>>;
  saveRolePermissions(roleId: number, matrix: Record<string, RoleMatrixItem>): Promise<Result<boolean, AppError>>;
}
