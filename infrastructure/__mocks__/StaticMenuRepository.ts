/**
 * StaticMenuRepository — Loads menu from static JSON config or mock file.
 *
 * This is the default menu source. For API-driven menus,
 * create an ApiMenuRepository that fetches from a backend endpoint.
 */
import type { MenuRepository } from '@domain/menus/MenuRepository';
import type { MenuItem } from '@domain/menus/entities/MenuItem';
import type { AppError } from '@domain/shared/exceptions/AppError';
import { Result } from '@domain/shared/value-objects/Result';
import { createAppError } from '@domain/shared/exceptions/AppError';

export class StaticMenuRepository implements MenuRepository {
  async getMenu(
    userPermissions?: readonly string[],
    userRole?: string
  ): Promise<Result<readonly MenuItem[], AppError>> {
    try {
      const fallbackModule = await import('../../public/mock/menu.json');
      const mockData = fallbackModule.default as unknown as { success: boolean; data: MenuItem[] };
      if (mockData?.data) {
        let items = mockData.data as MenuItem[];

        // Filter by permissions and role if provided
        if (userPermissions || userRole) {
          items = filterMenuItems(items, userPermissions, userRole);
        }

        return Result.ok(items);
      }
      return Result.fail(createAppError(500, 'Failed to load menu configuration'));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error loading menu';
      return Result.fail(createAppError(500, msg));
    }
  }
}

/**
 * Recursively filter menu items by permissions and role.
 */
function filterMenuItems(items: MenuItem[], permissions?: readonly string[], role?: string): MenuItem[] {
  return items
    .filter((item) => {
      // Check role restriction
      if (item.roles && item.roles.length > 0 && role) {
        if (!item.roles.includes(role)) return false;
      }

      // Check permission restriction
      if (item.permissions && item.permissions.length > 0 && permissions) {
        const hasPermission = item.permissions.some((p) => permissions.includes(p));
        if (!hasPermission) return false;
      }

      return true;
    })
    .map((item) => {
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          children: filterMenuItems(item.children as MenuItem[], permissions, role),
        };
      }
      return item;
    });
}
