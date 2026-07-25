import type { UserRepository } from '~/domain/repositories/UserRepository';
import type { UserResponseData } from '~/domain/entities/User';
import type { Result } from '~/domain/core/Result';

export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<Result<UserResponseData, string>> {
    return this.userRepository.getUsers();
  }
}
