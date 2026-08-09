/**
 * DashboardRepository Interface — Domain contract for dashboard data.
 */
import type { DashboardData } from '../entities/DashboardStat';
import type { Result } from '~/domain/core/Result';
import type { AppError } from '~/domain/core/AppError';

export interface DashboardRepository {
  /**
   * Fetch dashboard statistics and chart data.
   */
  getDashboard(): Promise<Result<DashboardData, AppError>>;
}
