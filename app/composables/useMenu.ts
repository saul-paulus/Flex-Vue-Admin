/**
 * useMenu Composable — UI state management for navigation menu.
 */
import type { MenuItem } from '@domain/menus/entities/MenuItem';

export function useMenu() {
  const menuItems = useState<MenuItem[]>('menu:items', () => []);
  const isLoading = useState<boolean>('menu:isLoading', () => false);
  const isLoaded = useState<boolean>('menu:isLoaded', () => false);

  const getMenu = async () => {
    if (isLoaded.value && menuItems.value.length > 0) {
      return menuItems.value;
    }
    isLoading.value = true;
    try {
      const nuxtApp = useNuxtApp();
      const res = await nuxtApp.$getMenuUseCase.execute();
      if (res.isOk() && res.value) {
        menuItems.value = [...res.value];
        isLoaded.value = true;
      }
    } catch (err) {
      console.error('Failed to fetch menu:', err);
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
