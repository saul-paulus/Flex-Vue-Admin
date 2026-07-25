import type { AuthRepository } from '~/domain/repositories/AuthRepository';
import type { AuthUser } from '~/domain/entities/Auth';
import type { Result } from '~/domain/core/Result';

/**
 * GetCurrentUserUseCase — Fetches the currently authenticated user profile.
 *
 * This use case is called after login to hydrate the user state,
 * and on app initialization to verify the session is still valid.
 */
export class GetCurrentUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(): Promise<Result<AuthUser, string>> {
    return this.authRepository.getCurrentUser();
  }
}
