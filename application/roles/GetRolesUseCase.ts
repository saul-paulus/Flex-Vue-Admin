/**
 * GetRolesUseCase — Fetches all roles and permission groups.
 */
import type { RoleRepository, RolesListResult } from '~/domain/role/repositories/RoleRepository';
import type { AppError } from '~/domain/core/AppError';
import type { Result } from '~/domain/core/Result';

export class GetRolesUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(): Promise<Result<RolesListResult, AppError>> {
    return this.roleRepository.getRoles();
  }
}
