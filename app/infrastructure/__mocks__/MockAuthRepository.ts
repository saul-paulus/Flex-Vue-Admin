import type { AuthRepository } from '~/domain/repositories/AuthRepository';
import type { AuthToken, AuthUser, LoginCredentials } from '~/domain/entities/Auth';
import { Result } from '~/domain/core/Result';

/**
 * MockAuthRepository — For testing and development ONLY.
 *
 * This mock repository simulates authentication without hitting a real API.
 * It should NEVER be used in production builds.
 *
 * Usage:
 * - Unit tests: inject directly into use cases
 * - Dev mode: conditionally register in plugin via environment flag
 */

const MOCK_CREDENTIALS = {
  personalId: '1234567890',
  password: 'password',
} as const;

const MOCK_TOKEN: AuthToken = {
  accessToken:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE3ODQ4MjI5MDQsImV4cCI6MTc4NDgyNjUwNCwibmJmIjoxNzg0ODIyOTA0LCJqdGkiOiIyTlZTaGJmZzlIVmRSSVVtIiwic3ViIjoiOSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.82640S6FjhfMcmaSDjd3u1fhx2brkde2jqaA8g8eQyk',
  tokenType: 'Bearer',
  expiresIn: 3600,
};

const MOCK_USER: AuthUser = {
  id: 9,
  username: 'Test User',
  personalId: '1234567890',
  verifiedAt: '2026-07-10 01:20:13',
  authorityLevel: 1,
  isActive: true,
  createdAt: '2026-07-10T01:20:13.000000Z',
  updatedAt: '2026-07-10T01:20:13.000000Z',
};

export class MockAuthRepository implements AuthRepository {
  async login(credentials: LoginCredentials): Promise<Result<AuthToken, string>> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (credentials.personalId === MOCK_CREDENTIALS.personalId && credentials.password === MOCK_CREDENTIALS.password) {
      return Result.ok(MOCK_TOKEN);
    }

    return Result.fail('Invalid Personal ID or Password');
  }

  async getCurrentUser(): Promise<Result<AuthUser, string>> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return Result.ok(MOCK_USER);
  }

  async logout(): Promise<Result<void, string>> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return Result.ok(undefined);
  }
}
