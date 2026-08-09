/**
 * MockDashboardRepository — Loads dashboard data from JSON mock file.
 */
import type { DashboardRepository } from '~/domain/dashboard/repositories/DashboardRepository';
import type { DashboardData } from '~/domain/dashboard/entities/DashboardStat';
import type { AppError } from '~/domain/core/AppError';
import { Result } from '~/domain/core/Result';
import { createAppError } from '~/domain/core/AppError';
import { DashboardMapper } from '../mappers/DashboardMapper';

export class MockDashboardRepository implements DashboardRepository {
  async getDashboard(): Promise<Result<DashboardData, AppError>> {
    try {
      const fallbackModule = await import('../../public/mock/dashboard.json');
      const mockData = fallbackModule.default as unknown as { success: boolean; data: Record<string, unknown> };
      if (mockData?.data) {
        const result = DashboardMapper.toDashboardData(
          mockData.data as Parameters<typeof DashboardMapper.toDashboardData>[0]
        );
        return Result.ok(result);
      }
      return Result.fail(createAppError(500, 'Failed to load mock dashboard'));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error loading mock dashboard';
      return Result.fail(createAppError(500, msg));
    }
  }
}
