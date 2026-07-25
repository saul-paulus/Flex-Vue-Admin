/**
 * Infrastructure API Response Types
 *
 * These types represent the raw API response format from the backend.
 * They are infrastructure concerns — the domain layer should NEVER use these directly.
 * Use mappers to convert these into domain entities.
 */

/**
 * Standard API response envelope from the backend.
 */
export interface ApiResponse<T> {
  success: boolean;
  responseCode: number;
  message: string;
  data: T;
  meta: unknown;
  links: unknown;
}

/**
 * Raw API token response (snake_case from backend).
 */
export interface ApiTokenData {
  access_token: string;
  token_type: string;
  expires_in: number;
}

/**
 * Raw API user response (snake_case from backend).
 */
export interface ApiUserData {
  id: number;
  username: string;
  id_personal: string;
  verify_idpersonal?: string;
  password_show?: string; // Backend sends this — we strip it in the mapper
  codeuker: string;
  id_wewenang: number;
  is_active: number;
  created_at?: string;
  updated_at?: string;
}

/** API response types */
export type ApiLoginResponse = ApiResponse<ApiTokenData>;
export type ApiUserResponse = ApiResponse<ApiUserData>;
export type ApiLogoutResponse = ApiResponse<null>;
