/**
 * RoleModel — UI-facing representation of a role.
 * Extends the pure domain entity with display-specific fields.
 */
import type { RoleEntity } from '../entities/Role';

export interface RoleModel extends RoleEntity {
  /** Bootstrap icon name for the role card */
  readonly icon: string;

  /** CSS color class for the role card */
  readonly color: string;
}
