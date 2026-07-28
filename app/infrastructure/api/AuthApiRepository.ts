/**
 * AuthApiRepository — Concrete implementation of AuthRepository.
 *
 * Uses HttpClient + AuthMapper + AppErrorNormalizer.
 * The ONLY class that knows about API response format.
 */
import type { AuthRepository } from '~/domain/auth/repositories/AuthRepository';
import type { AuthToken, AuthUser, LoginCredentials } from '~/domain/auth/entities/AuthSession';
import type { HttpClient } from './httpClient';
import type { ApiLoginResponse, ApiUserResponse, ApiLogoutResponse } from '../types/ApiTypes';
import { AuthMapper } from '../mappers/AuthMapper';
import { normalizeError } from './AppErrorNormalizer';
import { API_ENDPOINTS } from './endpoints';
import { Result } from '~/domain/core/Result';
import type { AppError } from '~/domain/core/AppError';
import { createAppError } from '~/domain/core/AppError';

export class AuthApiRepository implements AuthRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async login(credentials: LoginCredentials): Promise<Result<AuthToken, AppError>> {
    try {
      const payload = AuthMapper.toLoginPayload(credentials.identifier, credentials.password);
      const response = await this.httpClient.post<ApiLoginResponse>(API_ENDPOINTS.AUTH.LOGIN, payload);

      if (response?.data) {
        const token = AuthMapper.toAuthToken(response.data);
        if (token.accessToken) {
          return Result.ok(token);
        }
      }

      return Result.fail(createAppError(401, response?.message || 'Login failed: no token received'));
    } catch (error: unknown) {
      return Result.fail(normalizeError(error, 'An unexpected error occurred during login'));
    }
  }

  async getCurrentUser(): Promise<Result<AuthUser, AppError>> {
    try {
      const response = await this.httpClient.get<ApiUserResponse>(API_ENDPOINTS.AUTH.ME);

      if (response?.data) {
        const user = AuthMapper.toAuthUser(response.data);
        return Result.ok(user);
      }

      return Result.fail(createAppError(404, response?.message || 'Failed to fetch user profile'));
    } catch (error: unknown) {
      return Result.fail(normalizeError(error, 'An unexpected error occurred fetching user'));
    }
  }

  async logout(): Promise<Result<void, AppError>> {
    try {
      const response = await this.httpClient.post<ApiLogoutResponse>(API_ENDPOINTS.AUTH.LOGOUT);

      if (response?.success !== false) {
        return Result.ok(undefined);
      }

      return Result.fail(createAppError(500, response?.message || 'Logout failed'));
    } catch (error: unknown) {
      return Result.fail(normalizeError(error, 'Logout request failed'));
    }
  }
}
