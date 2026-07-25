import type { RoleRepository } from '~/domain/repositories/RoleRepository';
import type { RolesData, RoleItem } from '~/domain/entities/Role';
import type { HttpClient } from './httpClient';
import type { ApiResponse } from '../types/ApiTypes';
import { Result } from '~/domain/core/Result';

export class RoleApiRepository implements RoleRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async getRoles(): Promise<Result<RolesData, string>> {
    try {
      const response = await this.httpClient.get<ApiResponse<RolesData>>('/v1/roles');
      if (response && response.success && response.data) {
        return Result.ok(response.data);
      }
      return Result.fail(response?.message || 'Failed to fetch roles');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred while fetching roles';
      return Result.fail(message);
    }
  }

  async saveRolePermissions(role: RoleItem): Promise<Result<boolean, string>> {
    try {
      const response = await this.httpClient.put<ApiResponse<boolean>>(`/v1/roles/${role.id}/permissions`, role);
      if (response && response.success) {
        return Result.ok(true);
      }
      return Result.fail(response?.message || 'Failed to save role permissions');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred saving permissions';
      return Result.fail(message);
    }
  }
}
