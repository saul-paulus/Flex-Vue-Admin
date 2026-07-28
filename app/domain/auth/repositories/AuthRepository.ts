/**
 * Auth Repository Interface — Domain contract for authentication operations.
 *
 * This is a domain contract — implementations live in the infrastructure layer.
 * The repository returns domain types (AuthToken, AuthUser), NOT API response envelopes.
 *
 * @see infrastructure/repositories/auth/AuthApiRepository.ts for the concrete implementation
 */
import type { AuthToken, AuthUser, LoginCredentials } from '../entities/AuthSession';
import type { Result } from '~/domain/core/Result';
import type { AppError } from '~/domain/core/AppError';

export interface AuthRepository {
  /**
   * Authenticate a user with the given credentials.
   * @param credentials - Login credentials (identifier + password)
   * @returns Result containing AuthToken on success, or AppError on failure
   */
  login(credentials: LoginCredentials): Promise<Result<AuthToken, AppError>>;

  /**
   * Retrieve the currently authenticated user's profile.
   * @returns Result containing AuthUser on success, or AppError on failure
   */
  getCurrentUser(): Promise<Result<AuthUser, AppError>>;

  /**
   * Invalidate the current user's session.
   * @returns Result indicating success or failure
   */
  logout(): Promise<Result<void, AppError>>;
}
