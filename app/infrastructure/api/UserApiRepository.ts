import type { UserRepository } from '~/domain/repositories/UserRepository';
import type { UserItem, UserResponseData } from '~/domain/entities/User';
import type { HttpClient } from './httpClient';
import type { ApiResponse } from '../types/ApiTypes';
import { Result } from '~/domain/core/Result';

export class UserApiRepository implements UserRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async getUsers(): Promise<Result<UserResponseData, string>> {
    try {
      const response = await this.httpClient.get<ApiResponse<UserResponseData>>('/v1/users');
      if (response && response.success && response.data) {
        return Result.ok(response.data);
      }
      return Result.fail(response?.message || 'Failed to fetch users');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred while fetching users';
      return Result.fail(message);
    }
  }

  async getUserById(id: number | string): Promise<Result<UserItem, string>> {
    try {
      const response = await this.httpClient.get<ApiResponse<UserItem>>(`/v1/users/${id}`);
      if (response && response.success && response.data) {
        return Result.ok(response.data);
      }
      return Result.fail(response?.message || `Failed to fetch user with id ${id}`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : `An unexpected error occurred fetching user ${id}`;
      return Result.fail(message);
    }
  }
}
