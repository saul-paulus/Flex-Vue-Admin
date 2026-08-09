/**
 * useMenu Composable — UI state management for navigation menu using static data.
 */
import type { MenuItem } from '@domain/menus/entities/MenuItem';

export const STATIC_MENU_ITEMS: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'bi-grid-fill',
    route: '/dashboard',
    badge: 'MAIN',
    badgeVariant: 'primary',
  },
  {
    id: 'users',
    label: 'Users',
    icon: 'bi-people',
    children: [
      { id: 'users-list', label: 'Users List', route: '/users' },
      { id: 'users-view', label: 'User View', route: '/users/view' },
      { id: 'users-roles', label: 'Roles & Permissions', route: '/users/roles' },
    ],
  },
  {
    id: 'section-productivity',
    label: 'Productivity Apps',
    isDivider: true,
    sectionHeader: 'Productivity Apps',
  },
];

export function useMenu() {
  const menuItems = useState<MenuItem[]>('menu:items', () => [...STATIC_MENU_ITEMS]);
  const isLoading = useState<boolean>('menu:isLoading', () => false);

  const getMenu = async () => {
    return menuItems.value;
  };

  return {
    menuItems,
    isLoading,
    getMenu,
  };
}
