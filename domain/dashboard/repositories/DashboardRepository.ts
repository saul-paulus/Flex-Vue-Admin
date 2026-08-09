/**
 * Dashboard Repository Interface — Domain contract for dashboard data.
 */
import type { DashboardData } from '../entities/DashboardStat';
import type { Result } from '@domain/shared/value-objects/Result';
import type { AppError } from '@domain/shared/exceptions/AppError';

export interface DashboardRepository {
  getDashboard(): Promise<Result<DashboardData, AppError>>;
}
