/**
 * useRoles Composable — UI state management for roles & permissions using static data.
 */
import { computed } from 'vue';
import type { RoleModel, PermissionGroup } from '@domain/roles/entities/Role';
import { STATIC_ROLES, STATIC_PERMISSION_GROUPS } from '~/data/staticRoles';

export function useRoles() {
  const masterRoles = useState<RoleModel[]>('roles:master', () => [...STATIC_ROLES]);
  const permissionGroups = useState<PermissionGroup[]>('roles:groups', () => [...STATIC_PERMISSION_GROUPS]);
  const activeRoleId = useState<number>('roles:activeId', () => masterRoles.value[0]?.id ?? 1);
  const isLoading = useState<boolean>('roles:isLoading', () => false);
  const isSaving = useState<boolean>('roles:isSaving', () => false);

  const getRoles = async () => {
    return masterRoles.value;
  };

  const activeRole = computed<RoleModel | null>(() => {
    if (masterRoles.value.length === 0) return null;
    return masterRoles.value.find((r) => r.id === activeRoleId.value) || masterRoles.value[0] || null;
  });

  const selectRole = (id: number) => {
    activeRoleId.value = id;
  };

  const togglePermission = (itemKey: string, action: 'view' | 'create' | 'edit' | 'delete' | 'all') => {
    if (!activeRole.value) return;

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

  const saveRolePermissions = async () => {
    isSaving.value = true;
    await new Promise((resolve) => setTimeout(resolve, 300));
    isSaving.value = false;
    return true;
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
