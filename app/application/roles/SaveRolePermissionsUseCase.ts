import type { RoleRepository } from '~/domain/repositories/RoleRepository';
import type { RoleItem } from '~/domain/entities/Role';
import type { Result } from '~/domain/core/Result';

export class SaveRolePermissionsUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(role: RoleItem): Promise<Result<boolean, string>> {
    return this.roleRepository.saveRolePermissions(role);
  }
}
