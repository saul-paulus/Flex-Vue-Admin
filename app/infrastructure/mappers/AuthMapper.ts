/**
 * AuthMapper — Converts raw API data to clean domain entities.
 *
 * This mapper handles ALL known backend token/user field name conventions.
 * It is the ONLY place where API field names are translated to domain names.
 * Sensitive fields like `password_show` are intentionally stripped here.
 */
import type { AuthToken, AuthUser } from '~/domain/auth/entities/AuthSession';
import type { FlexApiTokenData, FlexApiUserData } from '../types/ApiTypes';

export const AuthMapper = {
  /**
   * Map API token data to domain AuthToken.
   * Handles: access_token, token, jwt, accessToken, bearer
   */
  toAuthToken(apiData: FlexApiTokenData): AuthToken {
    const accessToken =
      apiData.access_token || apiData.accessToken || apiData.token || apiData.jwt || apiData.bearer || '';

    const refreshToken = apiData.refresh_token || apiData.refreshToken;
    const tokenType = apiData.token_type || apiData.tokenType || 'Bearer';
    const expiresIn = apiData.expires_in || apiData.expiresIn;

    let expiresAt: Date | undefined;
    const rawExpiry = apiData.expires_at || apiData.expiresAt;
    if (rawExpiry) {
      expiresAt = new Date(rawExpiry);
    } else if (expiresIn) {
      expiresAt = new Date(Date.now() + expiresIn * 1000);
    }

    return {
      accessToken,
      refreshToken,
      tokenType,
      expiresIn,
      expiresAt,
    };
  },

  /**
   * Map API user data to domain AuthUser.
   * Strips sensitive fields (password_show) and normalizes types.
   */
  toAuthUser(apiData: FlexApiUserData): AuthUser {
    const identifier = apiData.id_personal || apiData.personal_id || apiData.personalId || apiData.identifier || '';

    const verifiedAt = apiData.verify_idpersonal || apiData.verified_at || apiData.verifiedAt;
    const authorityLevel = apiData.id_wewenang || apiData.authority_level || apiData.authorityLevel || 0;

    let isActive: boolean;
    if (typeof apiData.is_active === 'number') {
      isActive = apiData.is_active === 1;
    } else if (typeof apiData.isActive === 'boolean') {
      isActive = apiData.isActive;
    } else if (typeof apiData.active === 'boolean') {
      isActive = apiData.active;
    } else {
      isActive = true;
    }

    return {
      id: apiData.id || 0,
      username: apiData.username || apiData.name || apiData.full_name || apiData.fullName || '',
      identifier,
      verifiedAt,
      authorityLevel,
      isActive,
      createdAt: apiData.created_at || apiData.createdAt,
      updatedAt: apiData.updated_at || apiData.updatedAt,
      // password_show is intentionally NOT mapped — never stored in domain
    };
  },

  /**
   * Map domain LoginCredentials to API login payload.
   * Override field name mapping via optional fieldMap config.
   */
  toLoginPayload(
    identifier: string,
    password: string,
    fieldMap?: { identifierField?: string; passwordField?: string }
  ): Record<string, string> {
    const idField = fieldMap?.identifierField || 'id_personal';
    const pwField = fieldMap?.passwordField || 'password';
    return {
      [idField]: identifier,
      [pwField]: password,
    };
  },
};
