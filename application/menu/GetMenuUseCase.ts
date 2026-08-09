/**
 * GetMenuUseCase — Fetches navigation menu items.
 */
import type { MenuRepository } from '~/domain/menu/repositories/MenuRepository';
import type { MenuItem } from '~/domain/menu/entities/MenuItem';
import type { AppError } from '~/domain/core/AppError';
import type { Result } from '~/domain/core/Result';

export class GetMenuUseCase {
  constructor(private readonly menuRepository: MenuRepository) {}

  async execute(
    userPermissions?: readonly string[],
    userRole?: string
  ): Promise<Result<readonly MenuItem[], AppError>> {
    return this.menuRepository.getMenu(userPermissions, userRole);
  }
}
