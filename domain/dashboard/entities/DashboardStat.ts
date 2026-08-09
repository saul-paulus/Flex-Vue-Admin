/**
 * Dashboard Domain — Statistics and metrics entities.
 *
 * Backend-agnostic representation of dashboard data.
 * Works regardless of whether the backend returns:
 * - { users: 5432 } or { total_user: 5432 } or { activeUsers: 5432 }
 *
 * The DashboardMapper normalizes all variants.
 */

/**
 * A single dashboard stat card.
 */
export interface DashboardStat {
  /** Unique identifier for the stat (e.g., 'revenue', 'users', 'orders') */
  readonly id: string;

  /** Display label (e.g., 'NET REVENUE') */
  readonly label: string;

  /** Display value (formatted string, e.g., '$48,295' or '5,432') */
  readonly value: string;

  /** Trend information */
  readonly trend?: {
    readonly value: string;
    readonly direction: 'up' | 'down' | 'neutral';
    readonly label?: string;
  };

  /** Bootstrap icon class (e.g., 'bi-graph-up-arrow') */
  readonly icon?: string;

  /** CSS color variant (e.g., 'success', 'primary', 'warning', 'danger') */
  readonly colorVariant?: string;
}

/**
 * Dashboard chart data placeholder.
 */
export interface DashboardChart {
  readonly id: string;
  readonly title: string;
  readonly type: 'bar' | 'line' | 'pie' | 'donut' | 'area';
  readonly data?: unknown;
}

/**
 * Complete dashboard data model.
 */
export interface DashboardData {
  readonly stats: readonly DashboardStat[];
  readonly charts?: readonly DashboardChart[];
}
