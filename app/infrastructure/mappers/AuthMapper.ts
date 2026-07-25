import type { AuthToken, AuthUser } from '~/domain/entities/Auth';
import type { ApiTokenData, ApiUserData } from '../types/ApiTypes';

/**
 * AuthMapper — Converts raw API data to clean domain entities.
 *
 * This mapper is the ONLY place where API field names (snake_case)
 * are translated to domain field names (camelCase).
 * Sensitive fields like `password_show` are intentionally stripped here.
 */
export const AuthMapper = {
  /**
   * Map API token data to domain AuthToken.
   */
  toAuthToken(apiData: ApiTokenData): AuthToken {
    return {
      accessToken: apiData.access_token,
      tokenType: apiData.token_type,
      expiresIn: apiData.expires_in,
    };
  },

  /**
   * Map API user data to domain AuthUser.
   * Strips sensitive fields (password_show) and normalizes types.
   */
  toAuthUser(apiData: ApiUserData): AuthUser {
    return {
      id: apiData.id,
      username: apiData.username,
      personalId: apiData.id_personal,
      verifiedAt: apiData.verify_idpersonal,
      authorityLevel: apiData.id_wewenang,
      isActive: apiData.is_active === 1,
      createdAt: apiData.created_at,
      updatedAt: apiData.updated_at,
      // password_show is intentionally NOT mapped — never stored in domain
    };
  },

  /**
   * Map domain LoginCredentials to API login payload.
   */
  toLoginPayload(personalId: string, password: string): { id_personal: string; password: string } {
    return {
      id_personal: personalId,
      password,
    };
  },
};
