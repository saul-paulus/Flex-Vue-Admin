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

export interface RolesResponseData {
  roles: RoleItem[];
  permission_groups: PermissionGroupItem[];
}

export interface RolesApiResponse {
  success: boolean;
  message: string;
  data: RolesResponseData;
}

export const RolesService = {
  /**
   * Fetches roles mock data from /mock/roles.json via $fetch
   */
  async fetchRoles(): Promise<RolesApiResponse> {
    try {
      const response = await $fetch<RolesApiResponse>('/mock/roles.json');
      return response;
    } catch (err) {
      console.warn('Network fetch /mock/roles.json failed, falling back to static import:', err);
      const fallbackModule = await import('../../public/mock/roles.json');
      return fallbackModule.default as unknown as RolesApiResponse;
    }
  },
};
