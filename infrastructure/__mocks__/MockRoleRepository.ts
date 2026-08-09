/**
 * MockRoleRepository — Loads roles from JSON mock file.
 */
import type { RoleRepository, RolesListResult } from '~/domain/role/repositories/RoleRepository';
import type { RoleMatrixItem } from '~/domain/role/entities/Role';
import type { AppError } from '~/domain/core/AppError';
import { Result } from '~/domain/core/Result';
import { createAppError } from '~/domain/core/AppError';
import { RoleMapper } from '../mappers/RoleMapper';

export class MockRoleRepository implements RoleRepository {
  async getRoles(): Promise<Result<RolesListResult, AppError>> {
    try {
      const fallbackModule = await import('../../public/mock/roles.json');
      const mockData = fallbackModule.default as unknown as { success: boolean; data: Record<string, unknown> };
      if (mockData?.data) {
        const result = RoleMapper.toListResult(
          mockData.data as import('~/domain/role/dto/RoleDTO').RolesListResponseDTO
        );
        return Result.ok(result);
      }
      return Result.fail(createAppError(500, 'Failed to load mock roles'));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error loading mock roles';
      return Result.fail(createAppError(500, msg));
    }
  }

  async saveRolePermissions(
    _roleId: number,
    _matrix: Record<string, RoleMatrixItem>
  ): Promise<Result<boolean, AppError>> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return Result.ok(true);
  }
}
