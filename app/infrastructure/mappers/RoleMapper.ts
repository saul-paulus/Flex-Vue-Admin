import type { RoleItem, RolesData, PermissionGroupItem } from '~/domain/entities/Role';

/**
 * RoleMapper — Data boundary transformer between raw API payloads and Domain Role entities.
 */
export const RoleMapper = {
  toDomainRole(raw: any): RoleItem {
    return {
      id: Number(raw.id || 0),
      name: String(raw.name || ''),
      users_count: Number(raw.users_count ?? raw.usersCount ?? 0),
      icon: String(raw.icon || 'shield'),
      color: String(raw.color || 'primary'),
      description: String(raw.description || ''),
      created_at: String(raw.created_at || raw.createdAt || ''),
      updated_at: String(raw.updated_at || raw.updatedAt || ''),
      matrix: raw.matrix || {},
    };
  },

  toDomainRolesData(raw: any): RolesData {
    const roles = Array.isArray(raw.roles) ? raw.roles.map(this.toDomainRole) : [];
    const permission_groups: PermissionGroupItem[] = Array.isArray(raw.permission_groups || raw.permissionGroups)
      ? raw.permission_groups || raw.permissionGroups
      : [];

    return {
      roles,
      permission_groups,
    };
  },
};
