import type { UserRepository } from '~/domain/repositories/UserRepository';
import type { UserItem, UserResponseData } from '~/domain/entities/User';
import type { HttpClient } from './httpClient';
import type { ApiResponse } from '../types/ApiTypes';
import { UserMapper } from '../mappers/UserMapper';
import { handleApiError } from './apiErrorHandler';
import { API_ENDPOINTS } from './endpoints';
import { Result } from '~/domain/core/Result';

export class UserApiRepository implements UserRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async getUsers(): Promise<Result<UserResponseData, string>> {
    try {
      const response = await this.httpClient.get<ApiResponse<unknown>>(API_ENDPOINTS.USERS.BASE);
      if (response && response.success && response.data) {
        const domainData = UserMapper.toDomainResponseData(response.data);
        return Result.ok(domainData);
      }
      return Result.fail(response?.message || 'Failed to fetch users');
    } catch (error: unknown) {
      const errorMsg = handleApiError(error, 'An unexpected error occurred while fetching users');
      return Result.fail(errorMsg);
    }
  }

  async getUserById(id: number | string): Promise<Result<UserItem, string>> {
    try {
      const response = await this.httpClient.get<ApiResponse<unknown>>(API_ENDPOINTS.USERS.DETAIL(id));
      if (response && response.success && response.data) {
        const domainUser = UserMapper.toDomainUser(response.data);
        return Result.ok(domainUser);
      }
      return Result.fail(response?.message || `Failed to fetch user with id ${id}`);
    } catch (error: unknown) {
      const errorMsg = handleApiError(error, `An unexpected error occurred fetching user ${id}`);
      return Result.fail(errorMsg);
    }
  }
}
