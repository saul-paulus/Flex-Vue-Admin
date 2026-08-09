/**
 * Auth Domain Entity — Core authentication types.
 *
 * These types represent the domain model for authentication.
 * They are framework-agnostic and contain NO infrastructure concerns
 * (no API response wrappers, no transport details).
 */

/**
 * Credentials required to authenticate a user.
 */
export interface LoginCredentials {
  personalId: string;
  password: string;
}

/**
 * Authenticated user profile — domain representation.
 *
 * Note: This intentionally EXCLUDES sensitive data like passwords.
 * Password should NEVER leave the backend or be stored in the frontend domain model.
 */
export interface AuthUser {
  readonly id: number;
  readonly username: string;
  readonly personalId: string;
  readonly verifiedAt?: string;
  readonly authorityLevel: number;
  readonly isActive: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

/**
 * Authentication token data returned after successful login.
 */
export interface AuthToken {
  readonly accessToken: string;
  readonly tokenType: string;
  readonly expiresIn: number;
}

/**
 * Authenticated session — combines token and user data.
 */
export interface AuthSession {
  readonly token: AuthToken;
  readonly user: AuthUser;
}
