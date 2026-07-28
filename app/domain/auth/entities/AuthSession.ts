/**
 * Auth Domain Entity — Core authentication types.
 *
 * These types represent the domain model for authentication.
 * They are framework-agnostic and contain NO infrastructure concerns
 * (no API response wrappers, no transport details).
 */

/**
 * Credentials required to authenticate a user.
 * Backend-agnostic: the mapper handles field name translation.
 */
export interface LoginCredentials {
  readonly identifier: string;
  readonly password: string;
}

/**
 * Authenticated user profile — domain representation.
 *
 * Note: This intentionally EXCLUDES sensitive data like passwords.
 * The mapper strips any password-related fields from the API response.
 *
 * Field names are camelCase (domain convention), regardless of
 * whether the backend uses snake_case or camelCase.
 */
export interface AuthUser {
  readonly id: number;
  readonly username: string;
  readonly identifier: string;
  readonly verifiedAt?: string;
  readonly authorityLevel: number;
  readonly isActive: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

/**
 * Authentication token — backend-agnostic representation.
 *
 * Works with any backend token format:
 * - { access_token, token_type, expires_in } (Laravel Passport/JWT)
 * - { token } (Express custom)
 * - { jwt } (Alternative)
 * - { accessToken } (camelCase variant)
 *
 * The AuthMapper normalizes all these variants into this shape.
 */
export interface AuthToken {
  readonly accessToken: string;
  readonly refreshToken?: string;
  readonly tokenType: string;
  readonly expiresIn?: number;
  readonly expiresAt?: Date;
}

/**
 * Authenticated session — combines token and user data.
 */
export interface AuthSession {
  readonly token: AuthToken;
  readonly user: AuthUser;
}
