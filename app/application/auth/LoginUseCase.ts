import type { AuthRepository } from '~/domain/repositories/AuthRepository';
import type { AuthToken } from '~/domain/entities/Auth';
import type { TokenStoragePort } from '~/domain/ports/TokenPorts';
import { Result } from '~/domain/core/Result';

/**
 * LoginCommand — Input DTO for the login use case.
 */
export interface LoginCommand {
  readonly personalId: string;
  readonly password: string;
}

/**
 * LoginUseCase — Orchestrates the login flow.
 *
 * Responsibilities:
 * 1. Validate input (basic validation)
 * 2. Delegate authentication to repository
 * 3. Persist token on success
 *
 * This use case does NOT manage reactive state (that's the store's job).
 * It handles the pure business orchestration logic.
 */
export class LoginUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenStorage: TokenStoragePort
  ) {}

  async execute(command: LoginCommand): Promise<Result<AuthToken, string>> {
    // 1. Basic input validation
    if (!command.personalId.trim()) {
      return Result.fail('Personal ID is required');
    }

    if (!command.password.trim()) {
      return Result.fail('Password is required');
    }

    // 2. Authenticate via repository
    const loginResult = await this.authRepository.login({
      personalId: command.personalId,
      password: command.password,
    });

    // 3. Persist token on success
    if (loginResult.isOk()) {
      this.tokenStorage.save(loginResult.value.accessToken);
    }

    return loginResult;
  }
}
