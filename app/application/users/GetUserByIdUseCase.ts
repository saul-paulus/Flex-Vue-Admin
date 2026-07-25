import type { UserRepository } from '~/domain/repositories/UserRepository';
import type { UserItem } from '~/domain/entities/User';
import type { Result } from '~/domain/core/Result';

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number | string): Promise<Result<UserItem, string>> {
    return this.userRepository.getUserById(id);
  }
}
