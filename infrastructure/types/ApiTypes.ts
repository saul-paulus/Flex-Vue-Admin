/**
 * Infrastructure API Response Types — Backend-Agnostic.
 *
 * These types represent ALL known API response formats.
 * Used ONLY in the infrastructure layer (mappers/repositories).
 */

/**
 * Standard API response envelope.
 * Supports multiple conventions:
 * - Laravel: { success, data, message }
 * - NestJS:  { data, statusCode, message }
 * - Express: { data, error }
 * - DRF:     { results, count }
 */
export interface ApiResponse<T> {
  success?: boolean;
  status?: string;
  responseCode?: number;
  statusCode?: number;
  message?: string;
  error?: string;
  data?: T;
  results?: T;
  meta?: unknown;
  links?: unknown;
}

/**
 * Flexible token data — supports ALL common token field names.
 */
export interface FlexApiTokenData {
  // Laravel Passport / JWT
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  refresh_token?: string;
  // Express / custom
  token?: string;
  // Alternative naming
  jwt?: string;
  bearer?: string;
  // camelCase variants
  accessToken?: string;
  tokenType?: string;
  expiresIn?: number;
  refreshToken?: string;
  // Expiry date string
  expires_at?: string;
  expiresAt?: string;
}

/**
 * Flexible user data — supports snake_case and camelCase.
 */
export interface FlexApiUserData {
  id?: number;
  username?: string;
  name?: string;
  full_name?: string;
  fullName?: string;
  // Identifier fields (vary by backend)
  id_personal?: string;
  personal_id?: string;
  personalId?: string;
  identifier?: string;
  // Verification
  verify_idpersonal?: string;
  verified_at?: string;
  verifiedAt?: string;
  // Authority / Role
  id_wewenang?: number;
  authority_level?: number;
  authorityLevel?: number;
  role_id?: number;
  // Status
  is_active?: number | boolean;
  isActive?: boolean;
  active?: boolean;
  // Sensitive (stripped by mapper)
  password_show?: string;
  // Metadata
  codeuker?: string;
  email?: string;
  avatar?: string;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
}

/** Typed API response aliases */
export type ApiLoginResponse = ApiResponse<FlexApiTokenData>;
export type ApiUserResponse = ApiResponse<FlexApiUserData>;
export type ApiLogoutResponse = ApiResponse<null>;
