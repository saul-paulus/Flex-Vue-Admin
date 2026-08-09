/**
 * RoleModel — UI-facing representation of a role.
 */
import type { RoleEntity } from './entities/Role';

export interface RoleModel extends RoleEntity {
  readonly icon: string;
  readonly color: string;
}
