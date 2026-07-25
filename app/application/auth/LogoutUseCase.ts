import type { AuthRepository } from '~/domain/repositories/AuthRepository';
import type { TokenStoragePort } from '~/domain/ports/TokenPorts';
import type { Result } from '~/domain/core/Result';

/**
 * LogoutUseCase — Orchestrates the logout flow.
 *
 * Responsibilities:
 * 1. Call the repository to invalidate session server-side
 * 2. Clear persisted token regardless of API result
 *
 * Token clearing happens in the finally block to ensure
 * local state is always cleaned up, even if the API call fails.
 */
export class LogoutUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenStorage: TokenStoragePort
  ) {}

  async execute(): Promise<Result<void, string>> {
    try {
      const result = await this.authRepository.logout();
      return result;
    } finally {
      // Always clear local token, even if API call fails
      this.tokenStorage.clear();
    }
  }
}
