/**
 * GetRolesUseCase — Fetches all roles and permission groups.
 */
import type { RoleRepository, RolesListResult } from '@domain/roles/RoleRepository';
import type { AppError } from '@domain/shared/exceptions/AppError';
import type { Result } from '@domain/shared/value-objects/Result';

export class GetRolesUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(): Promise<Result<RolesListResult, AppError>> {
    return this.roleRepository.getRoles();
  }
}
