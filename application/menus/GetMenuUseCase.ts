/**
 * GetMenuUseCase — Fetches navigation menu items.
 */
import type { MenuRepository } from '@domain/menus/MenuRepository';
import type { MenuItem } from '@domain/menus/entities/MenuItem';
import type { AppError } from '@domain/shared/exceptions/AppError';
import type { Result } from '@domain/shared/value-objects/Result';

export class GetMenuUseCase {
  constructor(private readonly menuRepository: MenuRepository) {}

  async execute(
    userPermissions?: readonly string[],
    userRole?: string
  ): Promise<Result<readonly MenuItem[], AppError>> {
    return this.menuRepository.getMenu(userPermissions, userRole);
  }
}
