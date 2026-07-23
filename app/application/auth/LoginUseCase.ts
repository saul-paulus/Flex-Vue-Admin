import type { AuthLoginResponse, LoginPayload } from '~/domain/entities/Auth';
import type { AuthRepository } from '~/domain/repositories/AuthRepository';

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(payload: LoginPayload): Promise<AuthLoginResponse> {
    return this.authRepository.login(payload);
  }
}
