import type { AuthToken, AuthUser, LoginCredentials } from '../entities/Auth';
import type { Result } from '../core/Result';

/**
 * Repository interface for authentication operations.
 *
 * This is a domain contract — implementations live in the infrastructure layer.
 * The repository returns domain types (AuthToken, AuthUser), NOT API response envelopes.
 *
 * @see infrastructure/api/AuthApiRepository.ts for the concrete implementation
 */
export interface AuthRepository {
  /**
   * Authenticate a user with the given credentials.
   * @param credentials - Login credentials (personalId + password)
   * @returns Result containing AuthToken on success, or error message on failure
   */
  login(credentials: LoginCredentials): Promise<Result<AuthToken, string>>;

  /**
   * Retrieve the currently authenticated user's profile.
   * @returns Result containing AuthUser on success, or error message on failure
   */
  getCurrentUser(): Promise<Result<AuthUser, string>>;

  /**
   * Invalidate the current user's session.
   * @returns Result indicating success or failure
   */
  logout(): Promise<Result<void, string>>;
}
