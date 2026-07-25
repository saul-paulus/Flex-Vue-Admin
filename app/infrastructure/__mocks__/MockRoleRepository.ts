import type { RoleRepository } from '~/domain/repositories/RoleRepository';
import type { RolesData, RoleItem } from '~/domain/entities/Role';
import { Result } from '~/domain/core/Result';

export class MockRoleRepository implements RoleRepository {
  async getRoles(): Promise<Result<RolesData, string>> {
    try {
      const fallbackModule = await import('../../../public/mock/roles.json');
      const mockData = fallbackModule.default as unknown as { success: boolean; data: RolesData };
      if (mockData && mockData.data) {
        return Result.ok(mockData.data);
      }
      return Result.fail('Failed to load mock roles');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error loading mock roles';
      return Result.fail(msg);
    }
  }

  async saveRolePermissions(_role: RoleItem): Promise<Result<boolean, string>> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return Result.ok(true);
  }
}
