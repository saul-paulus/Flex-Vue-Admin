/**
 * GetCurrentUserUseCase — Fetches the authenticated user's profile.
 */
import type { AuthRepository } from '~/domain/auth/repositories/AuthRepository';
import type { AuthUser } from '~/domain/auth/entities/AuthSession';
import type { AppError } from '~/domain/core/AppError';
import type { Result } from '~/domain/core/Result';

export class GetCurrentUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(): Promise<Result<AuthUser, AppError>> {
    return this.authRepository.getCurrentUser();
  }
}
