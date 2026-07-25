import type { UserItem, UserResponseData, UserSummary, UserPagination } from '~/domain/entities/User';

/**
 * UserMapper — Data boundary transformer between raw API payloads and Domain User entities.
 */
export const UserMapper = {
  toDomainUser(raw: any): UserItem {
    return {
      id: Number(raw.id || 0),
      uuid: String(raw.uuid || ''),
      employee_id: String(raw.employee_id || raw.employeeId || ''),
      full_name: String(raw.full_name || raw.fullName || raw.name || ''),
      first_name: String(raw.first_name || raw.firstName || ''),
      last_name: String(raw.last_name || raw.lastName || ''),
      email: String(raw.email || ''),
      phone: String(raw.phone || ''),
      avatar: String(raw.avatar || ''),
      gender: String(raw.gender || 'male'),
      role: raw.role || 'User',
      department: String(raw.department || ''),
      branch: String(raw.branch || ''),
      position: String(raw.position || ''),
      status: raw.status || 'Active',
      joined_at: String(raw.joined_at || raw.joinedAt || ''),
      last_login: raw.last_login || raw.lastLogin || null,
      last_activity: String(raw.last_activity || raw.lastActivity || ''),
      created_at: String(raw.created_at || raw.createdAt || ''),
      updated_at: String(raw.updated_at || raw.updatedAt || ''),
      role_color: String(raw.role_color || raw.roleColor || 'primary'),
      status_color: String(raw.status_color || raw.statusColor || 'success'),
      permissions: Array.isArray(raw.permissions) ? raw.permissions : [],
      is_online: Boolean(raw.is_online ?? raw.isOnline ?? false),
      action: Array.isArray(raw.action) ? raw.action : ['view', 'edit'],
      location: raw.location,
      manager: raw.manager,
      stats: raw.stats,
      health: raw.health,
      timeline: raw.timeline,
      sessions: raw.sessions,
      teams_list: raw.teams_list || raw.teamsList,
    };
  },

  toDomainResponseData(raw: any): UserResponseData {
    const users = Array.isArray(raw.users) ? raw.users.map(this.toDomainUser) : [];
    const summary: UserSummary = {
      total_users: Number(raw.summary?.total_users ?? raw.summary?.totalUsers ?? users.length),
      active: Number(raw.summary?.active ?? users.filter((u) => u.status === 'Active').length),
      pending: Number(raw.summary?.pending ?? users.filter((u) => u.status === 'Pending').length),
      inactive: Number(raw.summary?.inactive ?? users.filter((u) => u.status === 'Inactive').length),
      growth: raw.summary?.growth || '+0 this month',
      engagement: raw.summary?.engagement || '100% engagement',
      onboarding: raw.summary?.onboarding || 'All set',
      follow_up: raw.summary?.follow_up || 'None',
    };

    const pagination: UserPagination = {
      page: Number(raw.pagination?.page ?? raw.meta?.current_page ?? 1),
      per_page: Number(raw.pagination?.per_page ?? raw.meta?.per_page ?? 10),
      total: Number(raw.pagination?.total ?? raw.meta?.total ?? users.length),
      last_page: Number(raw.pagination?.last_page ?? raw.meta?.last_page ?? 1),
    };

    return {
      summary,
      tabs: Array.isArray(raw.tabs) ? raw.tabs : [],
      filters: raw.filters || { roles: [] },
      sortable: Array.isArray(raw.sortable) ? raw.sortable : ['id', 'full_name', 'email'],
      pagination,
      users,
    };
  },
};
