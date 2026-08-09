/**
 * UserModel — UI-facing representation of a user.
 *
 * This model extends the domain entity with UI-specific fields
 * like computed badge colors, action menus, and display data.
 * Components interact with this type, NEVER with DTOs or entities directly.
 */
import type { UserEntity, UserStats, UserHealth, UserActivityTimeline, UserSession, UserTeam } from '../entities/User';

export interface UserModel extends UserEntity {
  /** CSS badge class for the role (e.g., 'bg-danger-subtle text-danger') */
  readonly roleBadgeClass: string;

  /** CSS class for the status indicator */
  readonly statusColorClass: string;

  /** Available actions for this user (e.g., ['view', 'edit', 'delete']) */
  readonly actions: readonly string[];

  /** Optional extended profile data */
  readonly stats?: UserStats;
  readonly health?: UserHealth;
  readonly timeline?: readonly UserActivityTimeline[];
  readonly sessions?: readonly UserSession[];
  readonly teamsList?: readonly UserTeam[];
}

/**
 * UserSummaryModel — Aggregate statistics for a user collection.
 * Used by dashboard cards and summary sections.
 */
export interface UserSummaryModel {
  readonly totalUsers: number;
  readonly active: number;
  readonly pending: number;
  readonly inactive: number;
  readonly growth?: string;
  readonly engagement?: string;
  readonly onboarding?: string;
  readonly followUp?: string;
}

/**
 * FilterOption — Generic filter option for dropdowns.
 */
export interface FilterOption {
  readonly label: string;
  readonly value: string;
}

/**
 * TabItem — Tab navigation item with count badge.
 */
export interface TabItem {
  readonly key: string;
  readonly label: string;
  readonly count: number;
}
