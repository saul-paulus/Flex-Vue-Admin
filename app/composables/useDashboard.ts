/**
 * useDashboard Composable — UI state management for dashboard using static data.
 */
import type { DashboardStat } from '@domain/dashboard/entities/DashboardStat';

export const STATIC_DASHBOARD_STATS: DashboardStat[] = [
  {
    id: 'revenue',
    label: 'NET REVENUE',
    value: '$48,295',
    trend: { value: '+12.8%', direction: 'up', label: 'this month' },
    icon: 'bi-graph-up-arrow',
    colorVariant: 'success',
  },
  {
    id: 'users',
    label: 'ACTIVE USERS',
    value: '5,432',
    trend: { value: '+8.4%', direction: 'up', label: 'this week' },
    icon: 'bi-people-fill',
    colorVariant: 'primary',
  },
  {
    id: 'orders',
    label: 'ORDERS',
    value: '1,248',
    trend: { value: '-3.1%', direction: 'down', label: 'this week' },
    icon: 'bi-bag-fill',
    colorVariant: 'warning',
  },
  {
    id: 'conversion',
    label: 'CONVERSION',
    value: '3.24%',
    trend: { value: '+1.2%', direction: 'up', label: 'vs last period' },
    icon: 'bi-bullseye',
    colorVariant: 'danger',
  },
];

export function useDashboard() {
  const stats = useState<DashboardStat[]>('dashboard:stats', () => [...STATIC_DASHBOARD_STATS]);
  const isLoading = useState<boolean>('dashboard:isLoading', () => false);

  const getDashboard = async () => {
    return stats.value;
  };

  return {
    stats,
    isLoading,
    getDashboard,
  };
}
