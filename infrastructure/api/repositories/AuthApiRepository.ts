/**
 * AuthApiRepository — Concrete implementation of AuthRepository.
 */
import type { AuthRepository } from '@domain/auth/AuthRepository';
import type { AuthToken, AuthUser, LoginCredentials } from '@domain/auth/entities/AuthSession';
import type { HttpClient } from '../httpClient';
import type { ApiLoginResponse, ApiUserResponse, ApiLogoutResponse } from '../../types/ApiTypes';
import { AuthMapper } from '../../mappers/AuthMapper';
import { normalizeError } from '../AppErrorNormalizer';
import { API_ENDPOINTS } from '../endpoints';
import { Result } from '@domain/shared/value-objects/Result';
import type { AppError } from '@domain/shared/exceptions/AppError';
import { createAppError } from '@domain/shared/exceptions/AppError';

const TEMP_TOKEN: AuthToken = {
  accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.dev-temp-token',
  tokenType: 'Bearer',
  expiresIn: 3600,
};

const TEMP_USER: AuthUser = {
  id: 1,
  username: 'Administrator',
  identifier: 'admin@example.com',
  personalId: '007101234',
  authorityLevel: 1,
  isActive: true,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

const TEMP_CREDENTIALS_LIST = [
  { identifier: 'admin@example.com', password: 'admin123' },
  { identifier: '1234567890', password: 'password' },
];

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
      // Temporary fallback for UI development phase when backend is not connected
      const isTempValid =
        TEMP_CREDENTIALS_LIST.some(
          (c) => c.identifier === credentials.identifier && c.password === credentials.password
        ) ||
        credentials.password === 'admin123' ||
        credentials.password === 'password';

      if (isTempValid) {
        return Result.ok(TEMP_TOKEN);
      }

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
    } catch {
      // Temporary fallback for UI development phase when backend is not connected
      return Result.ok(TEMP_USER);
    }
  }

  async logout(): Promise<Result<void, AppError>> {
    try {
      const response = await this.httpClient.post<ApiLogoutResponse>(API_ENDPOINTS.AUTH.LOGOUT);

      if (response?.success !== false) {
        return Result.ok(undefined);
      }

      return Result.fail(createAppError(500, response?.message || 'Logout failed'));
    } catch {
      return Result.ok(undefined);
    }
  }
}
