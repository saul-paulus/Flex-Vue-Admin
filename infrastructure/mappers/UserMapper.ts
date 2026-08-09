/**
 * UserMapper — Converts raw API payloads to domain User models.
 *
 * NO `any` types — uses typed DTOs throughout.
 * Handles both snake_case and camelCase backend conventions.
 */
import type { UserModel, UserSummaryModel, FilterOption, TabItem } from '@domain/users/models/UserModel';
import type { UserStats, UserHealth, UserActivityTimeline, UserSession, UserTeam } from '@domain/users/entities/User';
import type { UserResponseDTO, UserSummaryDTO, UserListResponseDTO, PaginationDTO } from '../api/dto/UserDTO';
import type { PaginationMeta } from '@domain/shared/types/PaginationModel';

/**
 * Helper: compute a CSS badge class based on role name.
 */
function roleBadgeClass(role: string): string {
  const map: Record<string, string> = {
    admin: 'bg-danger-subtle text-danger',
    manager: 'bg-warning-subtle text-warning',
    supervisor: 'bg-info-subtle text-info',
  };
  return map[role.toLowerCase()] || 'bg-primary-subtle text-primary';
}

/**
 * Helper: compute a CSS status color class.
 */
function statusColorClass(status: string): string {
  const map: Record<string, string> = {
    active: 'text-success',
    pending: 'text-warning',
    inactive: 'text-secondary',
    disabled: 'text-danger',
  };
  return map[status.toLowerCase()] || 'text-secondary';
}

export const UserMapper = {
  /**
   * Map raw user DTO to domain UserModel.
   */
  toModel(raw: UserResponseDTO): UserModel {
    const stats = raw.stats ? UserMapper.toStats(raw.stats) : undefined;
    const health = raw.health ? UserMapper.toHealth(raw.health) : undefined;
    const timeline = raw.timeline ? raw.timeline.map(UserMapper.toTimeline) : undefined;
    const sessions = raw.sessions ? raw.sessions.map(UserMapper.toSession) : undefined;
    const teamsList =
      raw.teams_list || raw.teamsList ? (raw.teams_list || raw.teamsList || []).map(UserMapper.toTeam) : undefined;

    const role = String(raw.role || raw.role_name || 'User');
    const status = String(raw.status || 'Active');

    return {
      id: Number(raw.id || 0),
      uuid: String(raw.uuid || ''),
      employeeId: String(raw.employee_id || raw.employeeId || ''),
      fullName: String(raw.full_name || raw.fullName || raw.name || ''),
      firstName: String(raw.first_name || raw.firstName || ''),
      lastName: String(raw.last_name || raw.lastName || ''),
      email: String(raw.email || raw.email_address || ''),
      phone: String(raw.phone || ''),
      avatar: String(raw.avatar || raw.avatar_url || ''),
      gender: String(raw.gender || 'male'),
      role,
      department: String(raw.department || ''),
      branch: String(raw.branch || ''),
      position: String(raw.position || ''),
      status,
      joinedAt: String(raw.joined_at || raw.joinedAt || ''),
      lastLogin: raw.last_login || raw.lastLogin || null,
      lastActivity: String(raw.last_activity || raw.lastActivity || ''),
      createdAt: String(raw.created_at || raw.createdAt || ''),
      updatedAt: String(raw.updated_at || raw.updatedAt || ''),
      permissions: Array.isArray(raw.permissions) ? raw.permissions : [],
      isOnline: Boolean(raw.is_online ?? raw.isOnline ?? false),
      location: raw.location,
      manager: raw.manager,
      // UI-specific model fields
      roleBadgeClass: roleBadgeClass(role),
      statusColorClass: statusColorClass(status),
      actions: Array.isArray(raw.action) ? raw.action : Array.isArray(raw.actions) ? raw.actions : ['view', 'edit'],
      stats,
      health,
      timeline,
      sessions,
      teamsList,
    };
  },

  toStats(raw: Record<string, unknown>): UserStats {
    return {
      logins: Number(raw.logins ?? 0),
      tasksClosed: Number(raw.tasks_closed ?? raw.tasksClosed ?? 0),
      projects: Number(raw.projects ?? 0),
      teams: Number(raw.teams ?? 0),
    };
  },

  toHealth(raw: Record<string, unknown>): UserHealth {
    return {
      emailVerification: Boolean(raw.email_verification ?? raw.emailVerification ?? false),
      twoFactor: Boolean(raw.two_factor ?? raw.twoFactor ?? false),
      riskScore: String(raw.risk_score ?? raw.riskScore ?? 'Unknown'),
    };
  },

  toTimeline(raw: Record<string, unknown>): UserActivityTimeline {
    return {
      title: String(raw.title ?? ''),
      description: String(raw.description ?? ''),
      time: String(raw.time ?? ''),
      indicatorColor: (raw.indicator_color as string | undefined) ?? (raw.indicatorColor as string | undefined),
    };
  },

  toSession(raw: Record<string, unknown>): UserSession {
    return {
      device: String(raw.device ?? ''),
      location: String(raw.location ?? ''),
      isCurrent: Boolean(raw.is_current ?? raw.isCurrent ?? false),
      lastActive: String(raw.last_active ?? raw.lastActive ?? ''),
    };
  },

  toTeam(raw: Record<string, unknown>): UserTeam {
    return {
      name: String(raw.name ?? ''),
      membersCount: Number(raw.members_count ?? raw.membersCount ?? 0),
      icon: String(raw.icon ?? ''),
      colorClass: String(raw.color_class ?? raw.colorClass ?? ''),
    };
  },

  /**
   * Map raw summary DTO to domain UserSummaryModel.
   */
  toSummary(raw: UserSummaryDTO | undefined, users: UserModel[]): UserSummaryModel {
    return {
      totalUsers: Number(raw?.total_users ?? raw?.totalUsers ?? raw?.total ?? users.length),
      active: Number(raw?.active ?? users.filter((u) => u.status.toLowerCase() === 'active').length),
      pending: Number(raw?.pending ?? users.filter((u) => u.status.toLowerCase() === 'pending').length),
      inactive: Number(raw?.inactive ?? users.filter((u) => u.status.toLowerCase() === 'inactive').length),
      growth: raw?.growth,
      engagement: raw?.engagement,
      onboarding: raw?.onboarding,
      followUp: raw?.follow_up ?? raw?.followUp,
    };
  },

  /**
   * Map raw pagination DTO to domain PaginationMeta.
   * Supports Laravel, Spring Boot, NestJS, Express, DRF conventions.
   */
  toPagination(raw: PaginationDTO | undefined, fallbackTotal: number): PaginationMeta {
    if (!raw) {
      return {
        currentPage: 1,
        perPage: 10,
        total: fallbackTotal,
        lastPage: Math.max(1, Math.ceil(fallbackTotal / 10)),
      };
    }

    const currentPage = Number(raw.page ?? raw.currentPage ?? raw.pageNumber ?? 1);
    const perPage = Number(raw.per_page ?? raw.limit ?? raw.pageSize ?? 10);
    const total = Number(raw.total ?? raw.totalItems ?? raw.totalElements ?? raw.count ?? fallbackTotal);
    const lastPage = Number(raw.last_page ?? raw.pages ?? raw.totalPages ?? Math.max(1, Math.ceil(total / perPage)));

    return { currentPage, perPage, total, lastPage };
  },

  /**
   * Map complete user list response DTO to structured result.
   */
  toListResult(raw: UserListResponseDTO) {
    const rawUsers = raw.users || raw.data || raw.items || raw.results || [];
    const users = rawUsers.map(UserMapper.toModel);
    const summary = UserMapper.toSummary(raw.summary, users);

    const tabs: TabItem[] = Array.isArray(raw.tabs)
      ? raw.tabs.map((t) => ({
          key: String(t.key ?? ''),
          label: String(t.label ?? ''),
          count: Number(t.count ?? 0),
        }))
      : [];

    const roleFilters: FilterOption[] = Array.isArray(raw.filters?.roles)
      ? raw.filters!.roles.map((r) => ({
          label: String(r.label ?? ''),
          value: String(r.value ?? ''),
        }))
      : [];

    const departmentFilters: FilterOption[] | undefined = raw.filters?.departments
      ? raw.filters.departments.map((d) => ({
          label: String(d.label ?? ''),
          value: String(d.value ?? ''),
        }))
      : undefined;

    const paginationRaw = raw.pagination || raw.meta;
    const pagination = UserMapper.toPagination(paginationRaw as PaginationDTO | undefined, users.length);
    const sortable = Array.isArray(raw.sortable) ? raw.sortable : ['id', 'fullName', 'email'];

    return {
      users,
      summary,
      tabs,
      filters: {
        roles: roleFilters,
        departments: departmentFilters,
      },
      sortable,
      pagination,
    };
  },
};
