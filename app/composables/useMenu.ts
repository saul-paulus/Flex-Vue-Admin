/**
 * useMenu Composable — UI state management for navigation menu using static data.
 */
import type { MenuItem } from '@domain/menus/entities/MenuItem';

export function useMenu() {
  const menuItems = useState<MenuItem[]>('menu:items', () => []);
  const isLoading = useState<boolean>('menu:isLoading', () => false);
  const getMenu = async () => {
    isLoading.value = true;
    try {
      // Mengambil menu dinamis dari server/api/menu.get.ts
      const data = await $fetch<MenuItem[]>('/api/menu');
      menuItems.value = data;
    } catch (error) {
      console.error('Failed to fetch menu:', error);
    } finally {
      isLoading.value = false;
    }
    return menuItems.value;
  };
  return {
    menuItems,
    isLoading,
    getMenu,
  };
}
