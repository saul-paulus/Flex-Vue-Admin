import type { UserRepository } from '~/domain/repositories/UserRepository';
import type { UserItem, UserResponseData } from '~/domain/entities/User';
import { Result } from '~/domain/core/Result';

export class MockUserRepository implements UserRepository {
  async getUsers(): Promise<Result<UserResponseData, string>> {
    try {
      const fallbackModule = await import('../../../public/mock/users.json');
      const mockData = fallbackModule.default as unknown as { success: boolean; data: UserResponseData };
      if (mockData && mockData.data) {
        return Result.ok(mockData.data);
      }
      return Result.fail('Failed to load mock users');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error loading mock users';
      return Result.fail(msg);
    }
  }

  async getUserById(id: number | string): Promise<Result<UserItem, string>> {
    const usersResult = await this.getUsers();
    if (usersResult.isFail()) {
      return Result.fail(usersResult.error);
    }
    const numId = Number(id);
    const found = usersResult.value.users.find(
      (u) => u.id === numId || u.uuid === String(id) || u.employee_id === String(id)
    );
    if (found) {
      return Result.ok(found);
    }
    return Result.ok(usersResult.value.users[0]);
  }
}
