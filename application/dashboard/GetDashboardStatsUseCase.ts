/**
 * GetDashboardStatsUseCase — Fetches dashboard statistics.
 */
import type { DashboardRepository } from '@domain/dashboard/DashboardRepository';
import type { DashboardData } from '@domain/dashboard/entities/DashboardStat';
import type { AppError } from '@domain/shared/exceptions/AppError';
import type { Result } from '@domain/shared/value-objects/Result';

export class GetDashboardStatsUseCase {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async execute(): Promise<Result<DashboardData, AppError>> {
    return this.dashboardRepository.getDashboard();
  }
}
