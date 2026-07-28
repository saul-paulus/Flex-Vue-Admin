/**
 * useDashboard Composable — UI state management for dashboard.
 */
import type { DashboardStat } from '~/domain/dashboard/entities/DashboardStat';

export function useDashboard() {
  const stats = useState<DashboardStat[]>('dashboard:stats', () => []);
  const isLoading = useState<boolean>('dashboard:isLoading', () => false);
  const isLoaded = useState<boolean>('dashboard:isLoaded', () => false);

  const getDashboard = async () => {
    if (isLoaded.value && stats.value.length > 0) {
      return stats.value;
    }
    isLoading.value = true;
    try {
      const nuxtApp = useNuxtApp();
      const res = await nuxtApp.$getDashboardStatsUseCase.execute();
      if (res.isOk() && res.value) {
        stats.value = [...res.value.stats];
        isLoaded.value = true;
      }
    } catch (err) {
      console.error('Failed to fetch dashboard:', err);
    } finally {
      isLoading.value = false;
    }
    return stats.value;
  };

  return {
    stats,
    isLoading,
    getDashboard,
  };
}
