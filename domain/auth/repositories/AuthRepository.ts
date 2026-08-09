/**
 * Auth Repository Interface — Domain contract for authentication operations.
 */
import type { AuthToken, AuthUser, LoginCredentials } from '../entities/AuthSession';
import type { Result } from '@domain/shared/value-objects/Result';
import type { AppError } from '@domain/shared/exceptions/AppError';

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<Result<AuthToken, AppError>>;
  getCurrentUser(): Promise<Result<AuthUser, AppError>>;
  logout(): Promise<Result<void, AppError>>;
}
