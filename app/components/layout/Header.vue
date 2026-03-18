<script setup lang="ts">
const emit = defineEmits(['toggle-sidebar'])
</script>

<template>
  <header class="header bg-white shadow-sm d-flex align-items-center px-3 px-md-4 border-bottom">
    <div class="d-flex align-items-center justify-content-between w-100 h-100">
      <!-- Kiri: Toggle Sidebar & Kotak Pencarian -->
      <div class="d-flex align-items-center gap-3">
        <!-- Branding Logo -->
        <NuxtLink
          to="/"
          class="text-decoration-none d-flex align-items-center fw-bolder fs-5 text-dark gap-2 me-md-2"
        >
          <i class="bi bi-heptagon-half text-primary fs-4" />
          <span class="d-none d-lg-block">niceAdmin</span>
        </NuxtLink>

        <!-- Sidebar Toggle -->
        <button
          class="btn btn-outline-light text-dark border shadow-sm rounded-3 d-flex align-items-center justify-content-center p-0 w-36 h-36"
          @click="emit('toggle-sidebar')"
        >
          <i class="bi bi-layout-sidebar" />
        </button>

        <div
          class="input-group d-none d-md-flex align-items-center border rounded-pill px-3 py-1 bg-light search-box"
        >
          <i class="bi bi-search text-muted me-2" />
          <input
            type="text"
            class="form-control border-0 bg-transparent shadow-none fs-7"
            placeholder="Search users, invoices, tickets..."
          >
          <kbd class="bg-white border text-dark ms-2 fw-bold px-2 rounded">/</kbd>
        </div>
      </div>

      <!-- Kanan: Menu Item Ekstra & Profil -->
      <div class="d-flex align-items-center gap-2 gap-md-3">
        <!-- Bendera Bahasa -->
        <button
          class="btn btn-outline-light text-dark border-0 rounded-circle w-36 h-36 p-0 d-none d-sm-flex align-items-center justify-content-center"
        >
          <i class="bi bi-globe fs-5" />
        </button>

        <!-- Grid Aplikasi -->
        <button
          class="btn btn-outline-light text-dark border-0 rounded-circle w-36 h-36 p-0 d-flex align-items-center justify-content-center"
        >
          <i class="bi bi-grid-3x3-gap fs-5" />
        </button>

        <!-- Mode Gelap -->
        <button
          class="btn btn-outline-light text-dark border-0 rounded-circle w-36 h-36 p-0 d-none d-sm-flex align-items-center justify-content-center"
        >
          <i class="bi bi-moon fs-5" />
        </button>

        <!-- Notifikasi Badge -->
        <button
          class="btn btn-outline-light text-dark border-0 rounded-circle w-36 h-36 p-0 position-relative d-flex align-items-center justify-content-center ms-1"
        >
          <i class="bi bi-bell fs-5" />
          <span
            class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-white rounded-circle badge-bell-translate"
          >
            <span class="visually-hidden">New alerts</span>
          </span>
        </button>

        <div class="vr mx-2 d-none d-sm-block text-muted min-h-30" />

        <!-- Dropdown Profil -->
        <div class="dropdown">
          <a
            href="#"
            class="d-flex align-items-center text-decoration-none text-dark"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff"
              alt="User Profile"
              class="rounded-circle border border-2 border-white shadow-sm"
              width="38"
              height="38"
            >
            <div class="d-none d-md-block text-start ms-2 lh-1">
              <span class="d-block fw-bold text-dark fs-85">John Doe</span>
              <span class="text-muted fs-70">Product Admin</span>
            </div>
          </a>
          <!-- Bootstrap Dropdown Menu -->
          <ul class="dropdown-menu dropdown-menu-end shadow-sm border mt-2 p-2">
            <li>
              <a
                class="dropdown-item py-2 px-3 rounded text-dark fs-7"
                href="#"
              ><i class="bi bi-person me-2" /> My Profile</a>
            </li>
            <li>
              <a
                class="dropdown-item py-2 px-3 rounded text-dark fs-7"
                href="#"
              ><i class="bi bi-gear me-2" /> Settings</a>
            </li>
            <li><hr class="dropdown-divider my-1"></li>
            <li>
              <a
                class="dropdown-item py-2 px-3 rounded text-danger fs-7 fw-medium"
                href="#"
              ><i class="bi bi-box-arrow-right me-2" /> Log out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>
