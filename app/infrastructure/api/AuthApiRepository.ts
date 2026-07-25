import type { AuthRepository } from '~/domain/repositories/AuthRepository';
import type { AuthToken, AuthUser, LoginCredentials } from '~/domain/entities/Auth';
import type { HttpClient } from './httpClient';
import type { ApiLoginResponse, ApiUserResponse, ApiLogoutResponse } from '../types/ApiTypes';
import { AuthMapper } from '../mappers/AuthMapper';
import { handleApiError } from './apiErrorHandler';
import { API_ENDPOINTS } from './endpoints';
import { Result } from '~/domain/core/Result';

export class AuthApiRepository implements AuthRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async login(credentials: LoginCredentials): Promise<Result<AuthToken, string>> {
    try {
      const payload = AuthMapper.toLoginPayload(credentials.personalId, credentials.password);
      const response = await this.httpClient.post<ApiLoginResponse>(API_ENDPOINTS.AUTH.LOGIN, payload);

      if (response && response.success && response.data?.access_token) {
        const token = AuthMapper.toAuthToken(response.data);
        return Result.ok(token);
      }

      return Result.fail(response?.message || 'Login failed');
    } catch (error: unknown) {
      const errorMsg = handleApiError(error, 'An unexpected error occurred during login');
      return Result.fail(errorMsg);
    }
  }

  async getCurrentUser(): Promise<Result<AuthUser, string>> {
    try {
      const response = await this.httpClient.get<ApiUserResponse>(API_ENDPOINTS.AUTH.ME);

      if (response && response.success && response.data) {
        const user = AuthMapper.toAuthUser(response.data);
        return Result.ok(user);
      }

      return Result.fail(response?.message || 'Failed to fetch user profile');
    } catch (error: unknown) {
      const errorMsg = handleApiError(error, 'An unexpected error occurred fetching user');
      return Result.fail(errorMsg);
    }
  }

  async logout(): Promise<Result<void, string>> {
    try {
      const response = await this.httpClient.post<ApiLogoutResponse>(API_ENDPOINTS.AUTH.LOGOUT);

      if (response && response.success) {
        return Result.ok(undefined);
      }

      return Result.fail(response?.message || 'Logout failed');
    } catch (error: unknown) {
      const errorMsg = handleApiError(error, 'Logout request failed');
      return Result.fail(errorMsg);
    }
  }
}
