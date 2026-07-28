/**
 * SaveRolePermissionsUseCase — Persists permission matrix changes for a role.
 */
import type { RoleRepository } from '~/domain/role/repositories/RoleRepository';
import type { RoleMatrixItem } from '~/domain/role/entities/Role';
import type { AppError } from '~/domain/core/AppError';
import type { Result } from '~/domain/core/Result';

export class SaveRolePermissionsUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(roleId: number, matrix: Record<string, RoleMatrixItem>): Promise<Result<boolean, AppError>> {
    return this.roleRepository.saveRolePermissions(roleId, matrix);
  }
}
