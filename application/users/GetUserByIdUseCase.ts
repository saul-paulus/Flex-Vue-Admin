/**
 * GetUserByIdUseCase — Fetches a single user by ID.
 */
import type { UserRepository } from '@domain/users/UserRepository';
import type { UserModel } from '@domain/users/models/UserModel';
import type { AppError } from '@domain/shared/exceptions/AppError';
import type { Result } from '@domain/shared/value-objects/Result';

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number | string): Promise<Result<UserModel, AppError>> {
    return this.userRepository.getUserById(id);
  }
}
