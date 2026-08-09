/**
 * UserRepository Interface — Domain contract for user operations.
 */
import type { UserModel, UserSummaryModel, FilterOption, TabItem } from '../entities/User';
import type { PaginationParams, PaginationMeta } from '@domain/shared/types/PaginationModel';
import type { Result } from '@domain/shared/value-objects/Result';
import type { AppError } from '@domain/shared/exceptions/AppError';

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
  getUsers(params?: PaginationParams): Promise<Result<UserListResult, AppError>>;
  getUserById(id: number | string): Promise<Result<UserModel, AppError>>;
}
