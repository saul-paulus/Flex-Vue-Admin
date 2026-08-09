/**
 * LogoutUseCase — Orchestrates the logout flow.
 */
import type { AuthRepository } from '@domain/auth/AuthRepository';
import type { TokenStoragePort } from '@domain/auth/TokenPorts';
import type { AppError } from '@domain/shared/exceptions/AppError';
import type { Result } from '@domain/shared/value-objects/Result';

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
