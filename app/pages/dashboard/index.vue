<script setup lang="ts">
// Halaman otomatis di-wrap NuxtLayout
</script>

<template>
  <div class="container-fluid py-2">
    <!-- Judul Header Halaman -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
      <div>
        <h4 class="mb-1 fw-bolder text-dark">Growth Command Center</h4>
        <p class="text-muted mb-0 small">
          Live commercial performance, delivery health, and engagement signals in one control surface.
        </p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-white border bg-white text-dark shadow-sm fw-medium px-3">
          <i class="bi bi-box-arrow-down me-2 text-muted" /> Export
        </button>
        <button class="btn btn-primary shadow-sm fw-medium px-3"><i class="bi bi-plus-lg me-2" /> Create Report</button>
      </div>
    </div>

    <!-- Kumpulan Kartu Statistik -->
    <div class="row g-4 mb-4">
      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border border-light shadow-sm h-100">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between">
              <div class="text-muted small mb-2 text-uppercase fw-bold letter-spacing-1 fs-70">NET REVENUE</div>
              <div class="badge bg-success-subtle text-success rounded-pill px-2 py-1">
                <i class="bi bi-graph-up-arrow" />
              </div>
            </div>
            <h3 class="mb-2 fw-bolder text-dark">$48,295</h3>
            <span class="text-success small fw-bold d-flex align-items-center gap-1">
              <i class="bi bi-arrow-up-right border rounded-circle border-success p-1" /> +12.8%
            </span>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border border-light shadow-sm h-100">
          <div class="card-body p-4">
            <div class="text-muted small mb-2 text-uppercase fw-bold letter-spacing-1 fs-70">ACTIVE USERS</div>
            <h3 class="mb-2 fw-bolder text-dark">5,432</h3>
            <span class="text-success small fw-bold d-flex align-items-center gap-1">
              <i class="bi bi-arrow-up-right border rounded-circle border-success p-1" /> +8.4%
            </span>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border border-light shadow-sm h-100">
          <div class="card-body p-4">
            <div class="text-muted small mb-2 text-uppercase fw-bold letter-spacing-1 fs-70">ORDERS</div>
            <h3 class="mb-2 fw-bolder text-dark">1,248</h3>
            <span class="text-danger small fw-bold d-flex align-items-center gap-1">
              <i class="bi bi-arrow-down-right border rounded-circle border-danger p-1" /> -3.1%
            </span>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="card border border-light shadow-sm h-100">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between">
              <div class="text-muted small mb-2 text-uppercase fw-bold letter-spacing-1 fs-70">CONVERSION</div>
            </div>
            <h3 class="mb-2 fw-bolder text-dark">3.24%</h3>
            <span class="text-success small fw-bold d-flex align-items-center gap-1">
              <i class="bi bi-arrow-up-right border rounded-circle border-success p-1" /> +1.2%
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Papan Kosong (Placeholder untuk Chart) -->
    <div class="row g-4">
      <div class="col-12 col-xl-8">
        <div class="card border border-light shadow-sm h-100 min-h-400">
          <div class="card-header bg-white border-0 pt-4 pb-0 px-4">
            <h6 class="fw-bold text-dark">Revenue Flow</h6>
          </div>
          <div class="card-body d-flex flex-column align-items-center justify-content-center text-muted">
            <i class="bi bi-bar-chart-fill display-1 text-light" />
            <p class="mt-3">Chart Placeholder (Gunakan Chart.js atau ApexCharts nantinya)</p>
          </div>
        </div>
      </div>

      <div class="col-12 col-xl-4">
        <div class="card border border-light shadow-sm h-100">
          <div class="card-header bg-white border-0 pt-4 pb-0 px-4">
            <h6 class="fw-bold text-dark">Traffic Sources</h6>
          </div>
          <div class="card-body d-flex flex-column align-items-center justify-content-center text-muted">
            <i class="bi bi-pie-chart-fill display-1 text-light" />
            <p class="mt-3">Donut Chart Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
