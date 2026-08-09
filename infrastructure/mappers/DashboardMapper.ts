/**
 * DashboardMapper — Converts raw API data to domain DashboardStat models.
 */
import type { DashboardStat, DashboardData } from '~/domain/dashboard/entities/DashboardStat';

interface DashboardStatDTO {
  id?: string;
  label?: string;
  title?: string;
  value?: string | number;
  trend?: {
    value?: string;
    direction?: string;
    label?: string;
  };
  change?: string;
  changeDirection?: string;
  icon?: string;
  color?: string;
  colorVariant?: string;
  color_variant?: string;
}

interface DashboardResponseDTO {
  stats?: DashboardStatDTO[];
  data?: DashboardStatDTO[];
  cards?: DashboardStatDTO[];
  metrics?: DashboardStatDTO[];
}

export const DashboardMapper = {
  toStat(raw: DashboardStatDTO): DashboardStat {
    let trend = raw.trend;
    if (!trend && raw.change) {
      trend = {
        value: raw.change,
        direction: raw.changeDirection || 'neutral',
      };
    }

    return {
      id: String(raw.id || raw.label || ''),
      label: String(raw.label || raw.title || ''),
      value: String(raw.value ?? ''),
      trend: trend
        ? {
            value: String(trend.value || ''),
            direction: (trend.direction as 'up' | 'down' | 'neutral') || 'neutral',
            label: trend.label,
          }
        : undefined,
      icon: raw.icon,
      colorVariant: raw.colorVariant || raw.color_variant || raw.color,
    };
  },

  toDashboardData(raw: DashboardResponseDTO): DashboardData {
    const rawStats = raw.stats || raw.data || raw.cards || raw.metrics || [];
    return {
      stats: rawStats.map(DashboardMapper.toStat),
    };
  },
};
