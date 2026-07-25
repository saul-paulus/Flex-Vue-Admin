import type { AuthRepository } from '~/domain/repositories/AuthRepository';
import type { AuthToken, AuthUser, LoginCredentials } from '~/domain/entities/Auth';
import type { HttpClient } from './httpClient';
import type { ApiLoginResponse, ApiUserResponse, ApiLogoutResponse } from '../types/ApiTypes';
import { AuthMapper } from '../mappers/AuthMapper';
import { Result } from '~/domain/core/Result';

/**
 * AuthApiRepository — Concrete implementation of AuthRepository.
 *
 * This class handles API communication for authentication.
 * It transforms raw API responses into domain types using AuthMapper.
 *
 * IMPORTANT: This class does NOT contain mock data.
 * For testing, use MockAuthRepository from __mocks__/MockAuthRepository.ts
 */
export class AuthApiRepository implements AuthRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async login(credentials: LoginCredentials): Promise<Result<AuthToken, string>> {
    try {
      const payload = AuthMapper.toLoginPayload(credentials.personalId, credentials.password);
      const response = await this.httpClient.post<ApiLoginResponse>('/auth/login', payload);

      if (response && response.success && response.data?.access_token) {
        const token = AuthMapper.toAuthToken(response.data);
        return Result.ok(token);
      }

      return Result.fail(response?.message || 'Login failed');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred during login';
      return Result.fail(message);
    }
  }

  async getCurrentUser(): Promise<Result<AuthUser, string>> {
    try {
      const response = await this.httpClient.get<ApiUserResponse>('/v1/auth/me');

      if (response && response.success && response.data) {
        const user = AuthMapper.toAuthUser(response.data);
        return Result.ok(user);
      }

      return Result.fail(response?.message || 'Failed to fetch user profile');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred fetching user';
      return Result.fail(message);
    }
  }

  async logout(): Promise<Result<void, string>> {
    try {
      const response = await this.httpClient.post<ApiLogoutResponse>('/auth/logout');

      if (response && response.success) {
        return Result.ok(undefined);
      }

      return Result.fail(response?.message || 'Logout failed');
    } catch (error: unknown) {
      // Logout errors are non-critical — we clear local state regardless
      const message = error instanceof Error ? error.message : 'Logout request failed';
      return Result.fail(message);
    }
  }
}
