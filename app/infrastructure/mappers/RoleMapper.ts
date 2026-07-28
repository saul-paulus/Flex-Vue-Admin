/**
 * RoleMapper — Converts raw API payloads to domain Role models.
 *
 * NO `any` types — uses typed DTOs throughout.
 */
import type { RoleModel } from '~/domain/role/models/RoleModel';
import type { PermissionGroup, RoleMatrixItem } from '~/domain/role/entities/Role';
import type { RoleResponseDTO, PermissionGroupDTO, RolesListResponseDTO } from '~/domain/role/dto/RoleDTO';

export const RoleMapper = {
  toModel(raw: RoleResponseDTO): RoleModel {
    const matrixRaw = raw.matrix || raw.permissions || {};
    const matrix: Record<string, RoleMatrixItem> = {};

    for (const [key, value] of Object.entries(matrixRaw)) {
      matrix[key] = {
        view: Boolean(value.view ?? false),
        create: Boolean(value.create ?? false),
        edit: Boolean(value.edit ?? false),
        delete: Boolean(value.delete ?? false),
        all: Boolean(value.all ?? false),
      };
    }

    return {
      id: Number(raw.id || 0),
      name: String(raw.name || ''),
      description: String(raw.description || ''),
      usersCount: Number(raw.users_count ?? raw.usersCount ?? 0),
      createdAt: String(raw.created_at || raw.createdAt || ''),
      updatedAt: String(raw.updated_at || raw.updatedAt || ''),
      matrix,
      // UI-specific fields
      icon: String(raw.icon || 'shield'),
      color: String(raw.color || 'primary'),
    };
  },

  toPermissionGroup(raw: PermissionGroupDTO): PermissionGroup {
    return {
      category: String(raw.category || ''),
      icon: String(raw.icon || ''),
      items: Array.isArray(raw.items) ? raw.items : Array.isArray(raw.permissions) ? raw.permissions : [],
    };
  },

  toListResult(raw: RolesListResponseDTO) {
    const rawRoles = raw.roles || raw.data || [];
    const roles = rawRoles.map(RoleMapper.toModel);
    const rawGroups = raw.permission_groups || raw.permissionGroups || [];
    const permissionGroups = rawGroups.map(RoleMapper.toPermissionGroup);

    return { roles, permissionGroups };
  },
};
