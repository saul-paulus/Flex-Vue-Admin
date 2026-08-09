/**
 * UserApiRepository — Concrete implementation of UserRepository.
 */
import type { UserRepository, UserListResult } from '@domain/users/UserRepository';
import type { UserModel } from '@domain/users/models/UserModel';
import type { PaginationParams } from '@domain/shared/types/PaginationModel';
import type { HttpClient } from '../httpClient';
import type { ApiResponse } from '../../types/ApiTypes';
import type { UserListResponseDTO, UserResponseDTO } from '../dto/UserDTO';
import { UserMapper } from '../../mappers/UserMapper';
import { normalizeError } from '../AppErrorNormalizer';
import { API_ENDPOINTS } from '../endpoints';
import { Result } from '@domain/shared/value-objects/Result';
import type { AppError } from '@domain/shared/exceptions/AppError';
import { createAppError } from '@domain/shared/exceptions/AppError';

export class UserApiRepository implements UserRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async getUsers(params?: PaginationParams): Promise<Result<UserListResult, AppError>> {
    try {
      const queryParams: Record<string, string | number> = {};
      if (params?.page) queryParams.page = params.page;
      if (params?.perPage) queryParams.per_page = params.perPage;
      if (params?.search) queryParams.search = params.search;
      if (params?.sortBy) queryParams.sort_by = params.sortBy;
      if (params?.sortDirection) queryParams.sort_direction = params.sortDirection;

      const response = await this.httpClient.get<ApiResponse<unknown>>(API_ENDPOINTS.USERS.BASE, {
        query: Object.keys(queryParams).length > 0 ? queryParams : undefined,
      });

      if (response?.data) {
        const domainData = UserMapper.toListResult(response.data as UserListResponseDTO);
        return Result.ok(domainData);
      }

      return Result.fail(createAppError(404, response?.message || 'Failed to fetch users'));
    } catch (error: unknown) {
      return Result.fail(normalizeError(error, 'An unexpected error occurred while fetching users'));
    }
  }

  async getUserById(id: number | string): Promise<Result<UserModel, AppError>> {
    try {
      const response = await this.httpClient.get<ApiResponse<unknown>>(API_ENDPOINTS.USERS.DETAIL(id));

      if (response?.data) {
        const domainUser = UserMapper.toModel(response.data as UserResponseDTO);
        return Result.ok(domainUser);
      }

      return Result.fail(createAppError(404, response?.message || `Failed to fetch user with id ${id}`));
    } catch (error: unknown) {
      return Result.fail(normalizeError(error, `An unexpected error occurred fetching user ${id}`));
    }
  }
}
