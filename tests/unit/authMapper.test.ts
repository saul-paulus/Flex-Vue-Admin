import { describe, expect, it } from 'vitest';
import { AuthMapper } from '~/infrastructure/mappers/AuthMapper';
import type { ApiTokenData, ApiUserData } from '~/infrastructure/types/ApiTypes';

describe('AuthMapper', () => {
  describe('toAuthToken', () => {
    it('should map API token data to domain AuthToken', () => {
      const apiData: ApiTokenData = {
        access_token: 'test-token-123',
        token_type: 'Bearer',
        expires_in: 3600,
      };

      const result = AuthMapper.toAuthToken(apiData);

      expect(result).toEqual({
        accessToken: 'test-token-123',
        tokenType: 'Bearer',
        expiresIn: 3600,
      });
    });
  });

  describe('toAuthUser', () => {
    it('should map API user data to domain AuthUser', () => {
      const apiData: ApiUserData = {
        id: 9,
        username: 'Test User',
        id_personal: '1234567890',
        verify_idpersonal: '2026-07-10 01:20:13',
        password_show: 'password', // Should be stripped!
        codeuker: '6617',
        id_wewenang: 1,
        is_active: 1,
        created_at: '2026-07-10T01:20:13.000000Z',
        updated_at: '2026-07-10T01:20:13.000000Z',
      };

      const result = AuthMapper.toAuthUser(apiData);

      expect(result.id).toBe(9);
      expect(result.username).toBe('Test User');
      expect(result.personalId).toBe('1234567890');
      expect(result.authorityLevel).toBe(1);
      expect(result.isActive).toBe(true);
      // Verify password_show is NOT in the result
      expect(result).not.toHaveProperty('password_show');
      expect(result).not.toHaveProperty('passwordShow');
    });

    it('should convert is_active=0 to false', () => {
      const apiData: ApiUserData = {
        id: 1,
        username: 'Inactive User',
        id_personal: '999',
        codeuker: '1234',
        id_wewenang: 2,
        is_active: 0,
      };

      const result = AuthMapper.toAuthUser(apiData);
      expect(result.isActive).toBe(false);
    });
  });

  describe('toLoginPayload', () => {
    it('should map domain credentials to API payload', () => {
      const result = AuthMapper.toLoginPayload('1234567890', 'password');
      expect(result).toEqual({
        id_personal: '1234567890',
        password: 'password',
      });
    });
  });
});
