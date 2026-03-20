import type { AuthResponse } from '~/domain/entities/Auth';
import type { AuthRepository } from '~/domain/repositories/AuthRepository';

import { httpClient } from './httpClient';

export class AuthService implements AuthRepository {
  async login(LoginPayload: { id_personal: string; password: string }): Promise<AuthResponse> {
    const data = await httpClient.post<AuthResponse>('/auth/login', LoginPayload);
    return {
      data: data.data,
      message: data.message,
      responseCode: data.responseCode,
    };
  }
}
