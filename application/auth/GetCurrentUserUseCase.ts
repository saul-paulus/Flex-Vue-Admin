/**
 * GetCurrentUserUseCase — Fetches the authenticated user's profile.
 */
import type { AuthRepository } from '@domain/auth/AuthRepository';
import type { AuthUser } from '@domain/auth/entities/AuthSession';
import type { AppError } from '@domain/shared/exceptions/AppError';
import type { Result } from '@domain/shared/value-objects/Result';

export class GetCurrentUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(): Promise<Result<AuthUser, AppError>> {
    return this.authRepository.getCurrentUser();
  }
}
