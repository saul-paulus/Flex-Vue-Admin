/**
 * UserRepository Interface — Domain contract for user operations.
 *
 * Returns domain models, NOT DTOs or API response envelopes.
 */
import type { UserModel, UserSummaryModel, FilterOption, TabItem } from '../models/UserModel';
import type { PaginationMeta, PaginationParams } from '~/domain/core/PaginationModel';
import type { Result } from '~/domain/core/Result';
import type { AppError } from '~/domain/core/AppError';

/**
 * The complete user list result returned by the repository.
 */
export interface UserListResult {
  readonly users: readonly UserModel[];
  readonly summary: UserSummaryModel;
  readonly tabs: readonly TabItem[];
  readonly filters: {
    readonly roles: readonly FilterOption[];
    readonly departments?: readonly FilterOption[];
  };
  readonly sortable: readonly string[];
  readonly pagination: PaginationMeta;
}

export interface UserRepository {
  /**
   * Fetch all users with summary, filters, and pagination.
   * @param params - Optional pagination/filter/sort parameters
   */
  getUsers(params?: PaginationParams): Promise<Result<UserListResult, AppError>>;

  /**
   * Fetch a single user by ID.
   */
  getUserById(id: number | string): Promise<Result<UserModel, AppError>>;
}
