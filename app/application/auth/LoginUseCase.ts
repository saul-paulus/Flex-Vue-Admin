import type { AuthRepository } from '~/domain/repositories/AuthRepository';

export class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(id_personal: string, password: string): Promise<string> {
    return this.authRepository.login({ id_personal, password });
  }
}
