/**
 * MockUserRepository — Loads users from JSON mock file.
 */
import type { UserRepository, UserListResult } from '@domain/users/UserRepository';
import type { UserModel } from '@domain/users/models/UserModel';
import type { PaginationParams } from '@domain/shared/types/PaginationModel';
import type { AppError } from '@domain/shared/exceptions/AppError';
import { Result } from '@domain/shared/value-objects/Result';
import { createAppError } from '@domain/shared/exceptions/AppError';
import { UserMapper } from '../mappers/UserMapper';

export class MockUserRepository implements UserRepository {
  async getUsers(_params?: PaginationParams): Promise<Result<UserListResult, AppError>> {
    try {
      const fallbackModule = await import('../../public/mock/users.json');
      const mockData = fallbackModule.default as unknown as { success: boolean; data: Record<string, unknown> };
      if (mockData?.data) {
        const result = UserMapper.toListResult(
          mockData.data as import('~/domain/user/dto/UserDTO').UserListResponseDTO
        );
        return Result.ok(result);
      }
      return Result.fail(createAppError(500, 'Failed to load mock users'));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error loading mock users';
      return Result.fail(createAppError(500, msg));
    }
  }

  async getUserById(id: number | string): Promise<Result<UserModel, AppError>> {
    const usersResult = await this.getUsers();
    if (usersResult.isFail()) {
      return Result.fail(usersResult.error);
    }
    const numId = Number(id);
    const found = usersResult.value.users.find(
      (u) => u.id === numId || u.uuid === String(id) || u.employeeId === String(id)
    );
    if (found) {
      return Result.ok(found);
    }
    if (usersResult.value.users.length > 0) {
      return Result.ok(usersResult.value.users[0]);
    }
    return Result.fail(createAppError(404, `User ${id} not found`));
  }
}
