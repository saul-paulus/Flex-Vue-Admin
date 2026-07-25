import type { RoleRepository } from '~/domain/repositories/RoleRepository';
import type { RolesData, RoleItem } from '~/domain/entities/Role';
import type { HttpClient } from './httpClient';
import type { ApiResponse } from '../types/ApiTypes';
import { RoleMapper } from '../mappers/RoleMapper';
import { handleApiError } from './apiErrorHandler';
import { API_ENDPOINTS } from './endpoints';
import { Result } from '~/domain/core/Result';

export class RoleApiRepository implements RoleRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async getRoles(): Promise<Result<RolesData, string>> {
    try {
      const response = await this.httpClient.get<ApiResponse<unknown>>(API_ENDPOINTS.ROLES.BASE);
      if (response && response.success && response.data) {
        const domainData = RoleMapper.toDomainRolesData(response.data);
        return Result.ok(domainData);
      }
      return Result.fail(response?.message || 'Failed to fetch roles');
    } catch (error: unknown) {
      const errorMsg = handleApiError(error, 'An unexpected error occurred while fetching roles');
      return Result.fail(errorMsg);
    }
  }

  async saveRolePermissions(role: RoleItem): Promise<Result<boolean, string>> {
    try {
      const response = await this.httpClient.put<ApiResponse<boolean>>(API_ENDPOINTS.ROLES.PERMISSIONS(role.id), role);
      if (response && response.success) {
        return Result.ok(true);
      }
      return Result.fail(response?.message || 'Failed to save role permissions');
    } catch (error: unknown) {
      const errorMsg = handleApiError(error, 'An unexpected error occurred saving permissions');
      return Result.fail(errorMsg);
    }
  }
}
