/**
 * GetUsersUseCase — Fetches the user list with pagination/filter support.
 */
import type { UserRepository, UserListResult } from '~/domain/user/repositories/UserRepository';
import type { PaginationParams } from '~/domain/core/PaginationModel';
import type { AppError } from '~/domain/core/AppError';
import type { Result } from '~/domain/core/Result';

export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params?: PaginationParams): Promise<Result<UserListResult, AppError>> {
    return this.userRepository.getUsers(params);
  }
}
