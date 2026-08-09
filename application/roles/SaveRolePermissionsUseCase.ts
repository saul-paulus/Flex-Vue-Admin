/**
 * SaveRolePermissionsUseCase — Persists permission matrix changes for a role.
 */
import type { RoleRepository } from '@domain/roles/RoleRepository';
import type { RoleMatrixItem } from '@domain/roles/entities/Role';
import type { AppError } from '@domain/shared/exceptions/AppError';
import type { Result } from '@domain/shared/value-objects/Result';

export class SaveRolePermissionsUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(roleId: number, matrix: Record<string, RoleMatrixItem>): Promise<Result<boolean, AppError>> {
    return this.roleRepository.saveRolePermissions(roleId, matrix);
  }
}
