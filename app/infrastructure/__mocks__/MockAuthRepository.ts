/**
 * MockAuthRepository — For testing and development ONLY.
 */
import type { AuthRepository } from '~/domain/auth/repositories/AuthRepository';
import type { AuthToken, AuthUser, LoginCredentials } from '~/domain/auth/entities/AuthSession';
import type { AppError } from '~/domain/core/AppError';
import { Result } from '~/domain/core/Result';
import { createAppError } from '~/domain/core/AppError';

const MOCK_CREDENTIALS = {
  identifier: '1234567890',
  password: 'password',
} as const;

const MOCK_TOKEN: AuthToken = {
  accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.mock-dev-token',
  tokenType: 'Bearer',
  expiresIn: 3600,
};

const MOCK_USER: AuthUser = {
  id: 9,
  username: 'Test User',
  identifier: '1234567890',
  verifiedAt: '2026-07-10 01:20:13',
  authorityLevel: 1,
  isActive: true,
  createdAt: '2026-07-10T01:20:13.000000Z',
  updatedAt: '2026-07-10T01:20:13.000000Z',
};

export class MockAuthRepository implements AuthRepository {
  async login(credentials: LoginCredentials): Promise<Result<AuthToken, AppError>> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (credentials.identifier === MOCK_CREDENTIALS.identifier && credentials.password === MOCK_CREDENTIALS.password) {
      return Result.ok(MOCK_TOKEN);
    }

    return Result.fail(createAppError(401, 'Invalid credentials'));
  }

  async getCurrentUser(): Promise<Result<AuthUser, AppError>> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return Result.ok(MOCK_USER);
  }

  async logout(): Promise<Result<void, AppError>> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return Result.ok(undefined);
  }
}
