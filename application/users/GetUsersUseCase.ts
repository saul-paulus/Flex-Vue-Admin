/**
 * GetUsersUseCase — Fetches the user list with pagination/filter support.
 */
import type { UserRepository, UserListResult } from '@domain/users/UserRepository';
import type { PaginationParams } from '@domain/shared/types/PaginationModel';
import type { AppError } from '@domain/shared/exceptions/AppError';
import type { Result } from '@domain/shared/value-objects/Result';

export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params?: PaginationParams): Promise<Result<UserListResult, AppError>> {
    return this.userRepository.getUsers(params);
  }
}
