/**
 * useRoles Composable — UI state management for roles & permissions.
 */
import { computed } from 'vue';
import type { RoleModel } from '@domain/roles/models/RoleModel';
import type { PermissionGroup, RoleMatrixItem } from '@domain/roles/entities/Role';

export function useRoles() {
  const masterRoles = useState<RoleModel[]>('roles:master', () => []);
  const permissionGroups = useState<PermissionGroup[]>('roles:groups', () => []);
  const activeRoleId = useState<number>('roles:activeId', () => 0);
  const isLoading = useState<boolean>('roles:isLoading', () => false);
  const isLoaded = useState<boolean>('roles:isLoaded', () => false);
  const isSaving = useState<boolean>('roles:isSaving', () => false);

  /**
   * Fetch roles via GetRolesUseCase.
   */
  const getRoles = async () => {
    if (isLoaded.value && masterRoles.value.length > 0) {
      return masterRoles.value;
    }
    isLoading.value = true;
    try {
      const nuxtApp = useNuxtApp();
      const res = await nuxtApp.$getRolesUseCase.execute();
      if (res.isOk() && res.value) {
        masterRoles.value = [...res.value.roles];
        permissionGroups.value = [...res.value.permissionGroups];
        if (masterRoles.value.length > 0 && !activeRoleId.value) {
          activeRoleId.value = masterRoles.value[0]?.id ?? 0;
        }
        isLoaded.value = true;
      }
    } catch (err) {
      console.error('Failed to fetch roles:', err);
    } finally {
      isLoading.value = false;
    }
    return masterRoles.value;
  };

  /**
   * Active role — returns the selected role or first available.
   * No hardcoded fallback data — returns empty state instead.
   */
  const activeRole = computed<RoleModel | null>(() => {
    if (masterRoles.value.length === 0) return null;
    return masterRoles.value.find((r) => r.id === activeRoleId.value) || masterRoles.value[0] || null;
  });

  const selectRole = (id: number) => {
    activeRoleId.value = id;
  };

  /**
   * Toggle a permission in the active role's matrix.
   */
  const togglePermission = (itemKey: string, action: 'view' | 'create' | 'edit' | 'delete' | 'all') => {
    if (!activeRole.value) return;

    // Since RoleModel is readonly, we need to mutate via the array
    const roleIndex = masterRoles.value.findIndex((r) => r.id === activeRoleId.value);
    if (roleIndex === -1) return;

    const role = masterRoles.value[roleIndex];
    const matrix = { ...role.matrix };

    if (!matrix[itemKey]) {
      matrix[itemKey] = { view: false, create: false, edit: false, delete: false, all: false };
    }

    const current = { ...matrix[itemKey] };

    if (action === 'all') {
      const newVal = !current.all;
      current.all = newVal;
      current.view = newVal;
      current.create = newVal;
      current.edit = newVal;
      current.delete = newVal;
    } else {
      current[action] = !current[action];
      current.all = current.view && current.create && current.edit && current.delete;
    }

    matrix[itemKey] = current;
    masterRoles.value[roleIndex] = { ...role, matrix };
  };

  /**
   * Save permissions via SaveRolePermissionsUseCase.
   */
  const saveRolePermissions = async () => {
    if (!activeRole.value) return false;

    isSaving.value = true;
    try {
      const nuxtApp = useNuxtApp();
      const res = await nuxtApp.$saveRolePermissionsUseCase.execute(
        activeRole.value.id,
        activeRole.value.matrix as Record<string, RoleMatrixItem>
      );
      return res.isOk();
    } catch (err) {
      console.error('Failed to save role permissions:', err);
      return false;
    } finally {
      isSaving.value = false;
    }
  };

  return {
    roles: masterRoles,
    permissionGroups,
    activeRoleId,
    activeRole,
    isLoading,
    isSaving,
    getRoles,
    selectRole,
    togglePermission,
    saveRolePermissions,
  };
}
