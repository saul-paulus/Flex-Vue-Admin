/**
 * RoleApiRepository — Concrete implementation of RoleRepository.
 */
import type { RoleRepository, RolesListResult } from '@domain/roles/RoleRepository';
import type { RoleMatrixItem } from '@domain/roles/entities/Role';
import type { HttpClient } from '../httpClient';
import type { ApiResponse } from '../../types/ApiTypes';
import type { RolesListResponseDTO } from '../dto/RoleDTO';
import { RoleMapper } from '../../mappers/RoleMapper';
import { normalizeError } from '../AppErrorNormalizer';
import { API_ENDPOINTS } from '../endpoints';
import { Result } from '@domain/shared/value-objects/Result';
import type { AppError } from '@domain/shared/exceptions/AppError';
import { createAppError } from '@domain/shared/exceptions/AppError';

export class RoleApiRepository implements RoleRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async getRoles(): Promise<Result<RolesListResult, AppError>> {
    try {
      const response = await this.httpClient.get<ApiResponse<unknown>>(API_ENDPOINTS.ROLES.BASE);

      if (response?.data) {
        const domainData = RoleMapper.toListResult(response.data as RolesListResponseDTO);
        return Result.ok(domainData);
      }

      return Result.fail(createAppError(404, response?.message || 'Failed to fetch roles'));
    } catch (error: unknown) {
      return Result.fail(normalizeError(error, 'An unexpected error occurred while fetching roles'));
    }
  }

  async saveRolePermissions(
    roleId: number,
    matrix: Record<string, RoleMatrixItem>
  ): Promise<Result<boolean, AppError>> {
    try {
      const response = await this.httpClient.put<ApiResponse<boolean>>(API_ENDPOINTS.ROLES.PERMISSIONS(roleId), {
        matrix,
      });

      if (response?.success !== false) {
        return Result.ok(true);
      }

      return Result.fail(createAppError(500, response?.message || 'Failed to save role permissions'));
    } catch (error: unknown) {
      return Result.fail(normalizeError(error, 'An unexpected error occurred saving permissions'));
    }
  }
}
