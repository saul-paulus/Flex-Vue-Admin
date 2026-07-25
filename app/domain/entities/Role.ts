/**
 * Role Domain Entity Definitions
 */

export interface RoleMatrixItem {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  all: boolean;
  v_dash?: boolean;
  c_dash?: boolean;
  e_dash?: boolean;
  d_dash?: boolean;
  a_dash?: boolean;
}

export interface RoleItem {
  id: number;
  name: string;
  users_count: number;
  icon: string;
  color: string;
  description: string;
  created_at: string;
  updated_at: string;
  matrix: Record<string, RoleMatrixItem>;
}

export interface PermissionGroupItem {
  category: string;
  icon: string;
  items: string[];
}

export interface RolesData {
  roles: RoleItem[];
  permission_groups: PermissionGroupItem[];
}
