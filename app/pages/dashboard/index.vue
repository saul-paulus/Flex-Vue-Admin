<script setup lang="ts">
import { onMounted } from 'vue';
import { useDashboard } from '~/composables/useDashboard';

const { stats, isLoading, getDashboard } = useDashboard();

onMounted(async () => {
  await getDashboard();
});

const getTrendIcon = (direction?: 'up' | 'down' | 'neutral') => {
  if (direction === 'up') return 'bi-arrow-up-right';
  if (direction === 'down') return 'bi-arrow-down-right';
  return 'bi-dash';
};

const getTrendClass = (direction?: 'up' | 'down' | 'neutral') => {
  if (direction === 'up') return 'text-success';
  if (direction === 'down') return 'text-danger';
  return 'text-secondary';
};
</script>

<template>
  <div class="container-fluid py-2">
    <!-- Header -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <div>
        <h4 class="mb-1 fw-bold text-primary">Growth Command Center</h4>
        <p class="text-secondary mb-0 small">
          Live commercial performance, delivery health, and engagement signals in one control surface.
        </p>
      </div>
      <div class="d-flex gap-2">
        <button
          class="btn btn-white border bg-elevated shadow-sm fw-medium px-3 d-flex align-items-center gap-2 text-primary"
        >
          <i class="bi bi-box-arrow-down text-muted" /> Export
        </button>
        <button class="btn btn-primary shadow-sm fw-medium px-3 d-flex align-items-center gap-2">
          <i class="bi bi-plus-lg" /> Create Report
        </button>
      </div>
    </div>

    <!-- Stat Cards Loading State -->
    <div v-if="isLoading" class="text-center py-5 text-muted">
      <div class="spinner-border spinner-border-sm me-2 text-primary" role="status" />
      Loading statistics...
    </div>

    <!-- Dynamic Stat Cards -->
    <div v-else class="row g-4 mb-4">
      <div v-for="stat in stats" :key="stat.id" class="col-12 col-md-6 col-xl-3">
        <div class="card shadow-sm h-100 rounded-md">
          <div class="card-body p-3 p-md-4 position-relative">
            <div class="small mb-1 text-uppercase fw-bold letter-spacing-1 text-tertiary" style="font-size: 0.7rem">
              {{ stat.label }}
            </div>
            <h3 class="fw-bolder mb-1 text-primary">{{ stat.value }}</h3>
            <span
              v-if="stat.trend"
              class="small fw-bold d-flex align-items-center gap-1"
              :class="getTrendClass(stat.trend.direction)"
            >
              <i class="bi" :class="getTrendIcon(stat.trend.direction)" />
              {{ stat.trend.value }} {{ stat.trend.label || '' }}
            </span>
            <div v-if="stat.icon" class="position-absolute top-0 end-0 p-3 pt-4">
              <div
                class="rounded d-flex align-items-center justify-content-center"
                :class="`bg-${stat.colorVariant || 'primary'}-subtle text-${stat.colorVariant || 'primary'}`"
                style="width: 36px; height: 36px"
              >
                <i class="bi fs-5" :class="stat.icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chart Placeholders -->
    <div class="row g-4">
      <div class="col-12 col-xl-8">
        <div class="card shadow-sm h-100 rounded-md" style="min-height: 400px">
          <div class="card-header border-0 pt-4 pb-0 px-4">
            <h6 class="fw-bold text-primary">Revenue Flow</h6>
          </div>
          <div class="card-body d-flex flex-column align-items-center justify-content-center text-secondary">
            <i class="bi bi-bar-chart-fill display-1 text-tertiary" />
            <p class="mt-3 fs-sm">Chart Component (Driven by DashboardRepository)</p>
          </div>
        </div>
      </div>

      <div class="col-12 col-xl-4">
        <div class="card shadow-sm h-100 rounded-md">
          <div class="card-header border-0 pt-4 pb-0 px-4">
            <h6 class="fw-bold text-primary">Traffic Sources</h6>
          </div>
          <div class="card-body d-flex flex-column align-items-center justify-content-center text-secondary">
            <i class="bi bi-pie-chart-fill display-1 text-tertiary" />
            <p class="mt-3 fs-sm">Donut Chart Component</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
