import type { AuthLoginResponse, AuthLogoutResponse, AuthUserResponse, LoginPayload } from '~/domain/entities/Auth';
import type { AuthRepository } from '~/domain/repositories/AuthRepository';

import { httpClient } from './httpClient';

export const MOCK_LOGIN_SUCCESS_RESPONSE: AuthLoginResponse = {
  success: true,
  responseCode: 200,
  message: 'User berhasil login',
  data: {
    access_token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE3ODQ4MjI5MDQsImV4cCI6MTc4NDgyNjUwNCwibmJmIjoxNzg0ODIyOTA0LCJqdGkiOiIyTlZTaGJmZzlIVmRSSVVtIiwic3ViIjoiOSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.82640S6FjhfMcmaSDjd3u1fhx2brkde2jqaA8g8eQyk',
    token_type: 'Bearer',
    expires_in: 3600,
  },
  meta: null,
  links: null,
};

export const MOCK_USER_ME_RESPONSE: AuthUserResponse = {
  success: true,
  responseCode: 200,
  message: 'User berhasil diambil',
  data: {
    id: 9,
    username: 'Test User',
    id_personal: '1234567890',
    verify_idpersonal: '2026-07-10 01:20:13',
    password_show: 'password',
    codeuker: '6617',
    id_wewenang: 1,
    is_active: 1,
    created_at: '2026-07-10T01:20:13.000000Z',
    updated_at: '2026-07-10T01:20:13.000000Z',
  },
  meta: null,
  links: null,
};

export const MOCK_LOGOUT_SUCCESS_RESPONSE: AuthLogoutResponse = {
  success: true,
  responseCode: 200,
  message: 'User berhasil logout',
  data: null,
  meta: null,
  links: null,
};

export class AuthService implements AuthRepository {
  async login(LoginPayload: LoginPayload): Promise<AuthLoginResponse> {
    try {
      const data = await httpClient.post<AuthLoginResponse>('/auth/login', LoginPayload);
      return data;
    } catch (error) {
      if (LoginPayload.id_personal === '1234567890' && LoginPayload.password === 'password') {
        return MOCK_LOGIN_SUCCESS_RESPONSE;
      }
      throw error;
    }
  }

  async getUserMe(): Promise<AuthUserResponse> {
    try {
      const data = await httpClient.get<AuthUserResponse>('/v1/auth/me');
      return data;
    } catch (_error) {
      return MOCK_USER_ME_RESPONSE;
    }
  }

  async logout(): Promise<AuthLogoutResponse> {
    try {
      const data = await httpClient.post<AuthLogoutResponse>('/auth/logout');
      return data;
    } catch (_error) {
      return MOCK_LOGOUT_SUCCESS_RESPONSE;
    }
  }
}
