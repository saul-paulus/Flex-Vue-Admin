import type { AuthRepository } from '~/domain/repositories/AuthRepository';
import { httpClient } from './httpClient';

export class AuthService implements AuthRepository {
  async login(payload: { id_personal: string; password: string }): Promise<string> {
    const data = await httpClient.post<{ token: string }>('/v1/auth/login', payload);
    return data.token;
  }
}
