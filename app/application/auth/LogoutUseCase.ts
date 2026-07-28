/**
 * LogoutUseCase — Orchestrates the logout flow.
 */
import type { AuthRepository } from '~/domain/auth/repositories/AuthRepository';
import type { TokenStoragePort } from '~/domain/auth/ports/TokenPorts';
import type { AppError } from '~/domain/core/AppError';
import type { Result } from '~/domain/core/Result';

export class LogoutUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenStorage: TokenStoragePort
  ) {}

  async execute(): Promise<Result<void, AppError>> {
    const result = await this.authRepository.logout();

    // Always clear local token, even if API call fails
    this.tokenStorage.clear();

    return result;
  }
}
