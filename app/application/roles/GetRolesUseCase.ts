import type { RoleRepository } from '~/domain/repositories/RoleRepository';
import type { RolesData } from '~/domain/entities/Role';
import type { Result } from '~/domain/core/Result';

export class GetRolesUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(): Promise<Result<RolesData, string>> {
    return this.roleRepository.getRoles();
  }
}
