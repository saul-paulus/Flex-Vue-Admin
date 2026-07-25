import { computed } from 'vue';
import { RolesService } from '../services/roles.service';
import type { RoleItem, PermissionGroupItem } from '../services/roles.service';

export function useRoles() {
  const masterRoles = useState<RoleItem[]>('roles:master', () => []);
  const permissionGroups = useState<PermissionGroupItem[]>('roles:groups', () => []);
  const activeRoleId = useState<number>('roles:activeId', () => 1);
  const isLoading = useState<boolean>('roles:isLoading', () => false);
  const isLoaded = useState<boolean>('roles:isLoaded', () => false);
  const isSaving = useState<boolean>('roles:isSaving', () => false);

  /**
   * Fetch roles and permission groups
   */
  const getRoles = async () => {
    if (isLoaded.value && masterRoles.value.length > 0) {
      return masterRoles.value;
    }
    isLoading.value = true;
    try {
      const res = await RolesService.fetchRoles();
      if (res && res.success && res.data) {
        masterRoles.value = res.data.roles || [];
        permissionGroups.value = res.data.permission_groups || [];
        if (masterRoles.value.length > 0 && !activeRoleId.value) {
          activeRoleId.value = masterRoles.value[0]?.id ?? 1;
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
   * Active selected role object
   */
  const activeRole = computed<RoleItem>(() => {
    const found = masterRoles.value.find((r) => r.id === activeRoleId.value);
    return (
      found ||
      masterRoles.value[0] || {
        id: 1,
        name: 'Administrator',
        users_count: 8,
        icon: 'shield-lock-fill',
        color: 'danger',
        description: 'Full system access',
        created_at: 'January 1, 2024',
        updated_at: 'May 15, 2024',
        matrix: {},
      }
    );
  });

  /**
   * Select a role by ID
   */
  const selectRole = (id: number) => {
    activeRoleId.value = id;
  };

  /**
   * Toggle or update a matrix permission for active role
   */
  const togglePermission = (itemKey: string, action: 'view' | 'create' | 'edit' | 'delete' | 'all') => {
    if (!activeRole.value.matrix[itemKey]) {
      activeRole.value.matrix[itemKey] = {
        view: false,
        create: false,
        edit: false,
        delete: false,
        all: false,
      };
    }
    const current = activeRole.value.matrix[itemKey];

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
  };

  /**
   * Save changes to role permissions
   */
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
