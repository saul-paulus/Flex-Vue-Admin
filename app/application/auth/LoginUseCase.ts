/**
 * LoginUseCase — Orchestrates the login flow.
 *
 * Responsibilities:
 * 1. Validate input (basic validation)
 * 2. Delegate authentication to repository
 * 3. Persist token on success
 */
import type { AuthRepository } from '~/domain/auth/repositories/AuthRepository';
import type { AuthToken } from '~/domain/auth/entities/AuthSession';
import type { TokenStoragePort } from '~/domain/auth/ports/TokenPorts';
import type { AppError } from '~/domain/core/AppError';
import { Result } from '~/domain/core/Result';
import { createAppError } from '~/domain/core/AppError';

export interface LoginCommand {
  readonly identifier: string;
  readonly password: string;
}

export class LoginUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenStorage: TokenStoragePort
  ) {}

  async execute(command: LoginCommand): Promise<Result<AuthToken, AppError>> {
    if (!command.identifier.trim()) {
      return Result.fail(createAppError(422, 'Identifier is required'));
    }

    if (!command.password.trim()) {
      return Result.fail(createAppError(422, 'Password is required'));
    }

    const loginResult = await this.authRepository.login({
      identifier: command.identifier,
      password: command.password,
    });

    if (loginResult.isOk()) {
      this.tokenStorage.save(loginResult.value.accessToken);
    }

    return loginResult;
  }
}
