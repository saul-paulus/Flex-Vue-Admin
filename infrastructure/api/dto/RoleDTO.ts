/**
 * Role DTOs — Raw backend response shapes.
 */
export interface RoleResponseDTO {
  id?: number | string;
  name?: string;
  users_count?: number;
  usersCount?: number;
  icon?: string;
  color?: string;
  description?: string;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
  matrix?: Record<string, Record<string, boolean>>;
  permissions?: Record<string, Record<string, boolean>>;
}

export interface PermissionGroupDTO {
  category?: string;
  icon?: string;
  items?: string[];
  permissions?: string[];
}

export interface RolesListResponseDTO {
  roles?: RoleResponseDTO[];
  data?: RoleResponseDTO[];
  permission_groups?: PermissionGroupDTO[];
  permissionGroups?: PermissionGroupDTO[];
}
