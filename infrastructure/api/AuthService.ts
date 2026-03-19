import { httpClient } from './httpClient';
import type { LoginPayload, AuthResponse } from '~/domain/entities/Auth';

export const AuthService = {
  /**
   * Mengirim kredensial login ke endpoint backend: /api/v1/auth/login
   */
  login(payload: LoginPayload) {
    return httpClient.post<AuthResponse>('/v1/auth/login', payload);
  },
};
