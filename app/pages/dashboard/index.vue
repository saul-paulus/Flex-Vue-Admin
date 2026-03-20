<script setup lang="ts">
// Halaman otomatis di-wrap NuxtLayout
</script>

<template>
  <div class="container-fluid py-2">
    <!-- Judul Header Halaman -->
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

    <!-- Kumpulan Kartu Statistik -->
    <div class="row g-4 mb-4">
      <!-- Net Revenue -->
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card shadow-sm h-100 rounded-md">
          <div class="card-body p-3 p-md-4 position-relative">
            <div class="small mb-1 text-uppercase fw-bold letter-spacing-1 text-tertiary" style="font-size: 0.7rem">
              NET REVENUE
            </div>
            <h3 class="fw-bolder mb-1 text-primary">$48,295</h3>
            <span class="small text-success fw-bold d-flex align-items-center gap-1">
              <i class="bi bi-arrow-up-right" /> +12.8% this month
            </span>
            <div class="position-absolute top-0 end-0 p-3 pt-4">
              <div
                class="bg-success-subtle text-success rounded d-flex align-items-center justify-content-center"
                style="width: 36px; height: 36px"
              >
                <i class="bi bi-graph-up-arrow fs-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Users -->
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card shadow-sm h-100 rounded-md">
          <div class="card-body p-3 p-md-4 position-relative">
            <div class="small mb-1 text-uppercase fw-bold letter-spacing-1 text-tertiary" style="font-size: 0.7rem">
              ACTIVE USERS
            </div>
            <h3 class="fw-bolder mb-1 text-primary">5,432</h3>
            <span class="small text-success fw-bold d-flex align-items-center gap-1">
              <i class="bi bi-arrow-up-right" /> +8.4% this week
            </span>
            <div class="position-absolute top-0 end-0 p-3 pt-4">
              <div
                class="bg-primary-subtle text-primary rounded d-flex align-items-center justify-content-center"
                style="width: 36px; height: 36px"
              >
                <i class="bi bi-people-fill fs-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Orders -->
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card shadow-sm h-100 rounded-md">
          <div class="card-body p-3 p-md-4 position-relative">
            <div class="small mb-1 text-uppercase fw-bold letter-spacing-1 text-tertiary" style="font-size: 0.7rem">
              ORDERS
            </div>
            <h3 class="fw-bolder mb-1 text-primary">1,248</h3>
            <span class="small text-danger fw-bold d-flex align-items-center gap-1">
              <i class="bi bi-arrow-down-right" /> -3.1% this week
            </span>
            <div class="position-absolute top-0 end-0 p-3 pt-4">
              <div
                class="bg-warning-subtle text-warning rounded d-flex align-items-center justify-content-center"
                style="width: 36px; height: 36px"
              >
                <i class="bi bi-bag-fill fs-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Conversion -->
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card shadow-sm h-100 rounded-md">
          <div class="card-body p-3 p-md-4 position-relative">
            <div class="small mb-1 text-uppercase fw-bold letter-spacing-1 text-tertiary" style="font-size: 0.7rem">
              CONVERSION
            </div>
            <h3 class="fw-bolder mb-1 text-primary">3.24%</h3>
            <span class="small text-success fw-bold d-flex align-items-center gap-1">
              <i class="bi bi-arrow-up-right" /> +1.2% vs last period
            </span>
            <div class="position-absolute top-0 end-0 p-3 pt-4">
              <div
                class="bg-danger-subtle text-danger rounded d-flex align-items-center justify-content-center"
                style="width: 36px; height: 36px"
              >
                <i class="bi bi-bullseye fs-5" />
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
            <p class="mt-3 fs-sm">Chart Placeholder (Gunakan Chart.js atau ApexCharts nantinya)</p>
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
            <p class="mt-3 fs-sm">Donut Chart Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
