import type { UserItem, UserResponseData } from '../entities/User';
import type { Result } from '../core/Result';

/**
 * UserRepository — Domain contract for user management operations.
 */
export interface UserRepository {
  /**
   * Fetch all users along with summary, filters, and pagination data.
   */
  getUsers(): Promise<Result<UserResponseData, string>>;

  /**
   * Fetch a single user by ID, UUID, or employee_id.
   */
  getUserById(id: number | string): Promise<Result<UserItem, string>>;
}
