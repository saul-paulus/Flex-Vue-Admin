import type { RolesData, RoleItem } from '../entities/Role';
import type { Result } from '../core/Result';

/**
 * RoleRepository — Domain contract for role and permission management operations.
 */
export interface RoleRepository {
  /**
   * Fetch all roles and permission group definitions.
   */
  getRoles(): Promise<Result<RolesData, string>>;

  /**
   * Save or update permissions for a specific role.
   */
  saveRolePermissions(role: RoleItem): Promise<Result<boolean, string>>;
}
