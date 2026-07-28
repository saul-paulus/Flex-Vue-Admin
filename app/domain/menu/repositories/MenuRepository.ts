/**
 * MenuRepository Interface — Domain contract for navigation menu.
 */
import type { MenuItem } from '../entities/MenuItem';
import type { Result } from '~/domain/core/Result';
import type { AppError } from '~/domain/core/AppError';

export interface MenuRepository {
  /**
   * Fetch the menu items.
   * @param userPermissions - User's current permissions (for filtering)
   * @param userRole - User's current role (for filtering)
   */
  getMenu(userPermissions?: readonly string[], userRole?: string): Promise<Result<readonly MenuItem[], AppError>>;
}
