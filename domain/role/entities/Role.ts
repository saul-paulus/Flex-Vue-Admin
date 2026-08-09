/**
 * Role Entity — Pure domain representation of a role.
 *
 * Contains ONLY business-relevant fields.
 * UI concerns (icon, color) are in RoleModel.
 */

export interface RoleMatrixItem {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  all: boolean;
}

export interface RoleEntity {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly usersCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly matrix: Readonly<Record<string, RoleMatrixItem>>;
}

export interface PermissionGroup {
  readonly category: string;
  readonly icon: string;
  readonly items: readonly string[];
}
