/**
 * MenuRepository Interface — Domain contract for navigation menu.
 */
import type { MenuItem } from './entities/MenuItem';
import type { Result } from '@domain/shared/value-objects/Result';
import type { AppError } from '@domain/shared/exceptions/AppError';

export interface MenuRepository {
  getMenu(userPermissions?: readonly string[], userRole?: string): Promise<Result<readonly MenuItem[], AppError>>;
}
