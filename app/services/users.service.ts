export interface UserSummary {
  total_users: number;
  active: number;
  pending: number;
  inactive: number;
  growth?: string;
  engagement?: string;
  onboarding?: string;
  follow_up?: string;
}

export interface TabItem {
  key: string;
  label: string;
  count: number;
}

export interface RoleFilterOption {
  label: string;
  value: string;
}

export interface UserActivityTimeline {
  title: string;
  description: string;
  time: string;
  indicator_color?: string;
}

export interface UserStats {
  logins: number;
  tasks_closed: number;
  projects: number;
  teams: number;
}

export interface UserHealth {
  email_verification: boolean;
  two_factor: boolean;
  risk_score: string;
}

export interface UserSession {
  device: string;
  location: string;
  is_current: boolean;
  last_active: string;
}

export interface UserTeam {
  name: string;
  members_count: number;
  icon: string;
  color_class: string;
}

export interface UserItem {
  id: number;
  uuid: string;
  employee_id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  avatar: string;
  gender: string;
  role: 'Admin' | 'Manager' | 'Supervisor' | 'User';
  department: string;
  branch: string;
  position: string;
  status: 'Active' | 'Pending' | 'Inactive';
  joined_at: string;
  last_login: string | null;
  last_activity: string;
  created_at: string;
  updated_at: string;
  role_color: string;
  status_color: string;
  permissions: string[];
  is_online: boolean;
  action: string[];
  location?: string;
  manager?: string;
  stats?: UserStats;
  health?: UserHealth;
  timeline?: UserActivityTimeline[];
  sessions?: UserSession[];
  teams_list?: UserTeam[];
}

export interface UserPagination {
  page: number;
  per_page: number;
  total: number;
  last_page: number;
}

export interface UserResponseData {
  summary: UserSummary;
  tabs: TabItem[];
  filters: {
    roles: RoleFilterOption[];
    departments?: { label: string; value: string }[];
  };
  sortable: string[];
  pagination: UserPagination;
  users: UserItem[];
}

export interface UserApiResponse {
  success: boolean;
  message: string;
  data: UserResponseData;
}

export const UsersService = {
  /**
   * Fetches users mock data from /mock/users.json via $fetch
   */
  async fetchUsers(): Promise<UserApiResponse> {
    try {
      const response = await $fetch<UserApiResponse>('/mock/users.json');
      return response;
    } catch (err) {
      console.warn('Network fetch /mock/users.json failed, falling back to static import:', err);
      const fallbackModule = await import('../../public/mock/users.json');
      return fallbackModule.default as unknown as UserApiResponse;
    }
  },
};
