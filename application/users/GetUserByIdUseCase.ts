/**
 * GetUserByIdUseCase — Fetches a single user by ID.
 */
import type { UserRepository } from '~/domain/user/repositories/UserRepository';
import type { UserModel } from '~/domain/user/models/UserModel';
import type { AppError } from '~/domain/core/AppError';
import type { Result } from '~/domain/core/Result';

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number | string): Promise<Result<UserModel, AppError>> {
    return this.userRepository.getUserById(id);
  }
}
