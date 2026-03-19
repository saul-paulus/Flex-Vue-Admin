<script setup lang="ts">
const emit = defineEmits(['toggle-sidebar']);
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
          />
          <kbd class="bg-white border text-dark ms-2 fw-bold px-2 rounded">/</kbd>
        </div>
      </div>

      <!-- Kanan: Menu Item Ekstra & Profil -->
      <div class="d-flex align-items-center gap-2 gap-md-3">
        <!-- Icon Group Pill -->
        <div
          class="d-none d-sm-flex align-items-center border rounded-pill px-2 py-1 bg-white shadow-sm gap-1"
          style="border-color: var(--border) !important"
        >
          <!-- Bendera Bahasa -->
          <button
            class="btn btn-sm btn-link text-muted p-1 border-0 rounded-circle d-flex align-items-center justify-content-center hover-bg-light"
            style="width: 36px; height: 36px"
          >
            <span style="font-size: 1.1rem; line-height: 1">🇺🇸</span>
          </button>

          <div class="vr bg-light mx-1" style="height: 20px; width: 1px" />

          <!-- Grid Aplikasi -->
          <button
            class="btn btn-sm btn-link text-muted p-1 border-0 rounded-circle d-flex align-items-center justify-content-center hover-bg-light"
            style="width: 36px; height: 36px"
          >
            <i class="bi bi-grid-3x3-gap fs-6" />
          </button>

          <!-- Mode Gelap -->
          <button
            class="btn btn-sm btn-link text-muted p-1 border-0 rounded-circle d-flex align-items-center justify-content-center hover-bg-light"
            style="width: 36px; height: 36px"
          >
            <i class="bi bi-moon fs-6" />
          </button>

          <div class="vr bg-light mx-1" style="height: 20px; width: 1px" />

          <!-- Chat Badge -->
          <button
            class="btn btn-sm btn-link text-muted p-1 border-0 rounded-circle position-relative d-flex align-items-center justify-content-center hover-bg-light"
            style="width: 36px; height: 36px"
          >
            <i class="bi bi-chat-left-text fs-6" />
            <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white"
              style="
                font-size: 0.6rem;
                padding: 0.2rem 0.35rem;
                transform: translate(-40%, 20%) !important;
              "
            >
              5
            </span>
          </button>

          <!-- Notifikasi Badge -->
          <button
            class="btn btn-sm btn-link text-muted p-1 border-0 rounded-circle position-relative d-flex align-items-center justify-content-center hover-bg-light"
            style="width: 36px; height: 36px"
          >
            <i class="bi bi-bell fs-6" />
            <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white"
              style="
                font-size: 0.6rem;
                padding: 0.2rem 0.35rem;
                transform: translate(-40%, 20%) !important;
              "
            >
              4
            </span>
          </button>
        </div>

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
              class="rounded-circle shadow-sm"
              width="38"
              height="38"
            />
            <div class="d-none d-md-block text-start ms-2 lh-1">
              <span class="d-block fw-bold" style="color: var(--title-color); font-size: 0.85rem"
                >John Doe</span
              >
              <span style="color: var(--secondary-color-text); font-size: 0.75rem"
                >Product Admin</span
              >
            </div>
            <i
              class="bi bi-chevron-down ms-2 small text-muted d-none d-md-inline"
              style="font-size: 0.7rem"
            />
          </a>
          <!-- Bootstrap Dropdown Menu -->
          <ul
            class="dropdown-menu dropdown-menu-end shadow-lg border-light mt-2 p-0 overflow-hidden"
            style="width: 260px; border-radius: var(--apple-radius, 14px)"
          >
            <!-- Header Dropdown -->
            <li
              class="p-3 border-bottom d-flex align-items-center gap-3"
              style="background-color: #f8fafc"
            >
              <img
                src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff"
                alt="User"
                class="rounded-circle border border-2 border-white shadow-sm"
                width="48"
                height="48"
              />
              <div class="lh-1">
                <span
                  class="d-block fw-bold"
                  style="color: var(--title-color); font-size: 0.95rem; margin-bottom: 5px"
                  >John Doe</span
                >
                <span style="color: var(--secondary-color-text); font-size: 0.8rem"
                  >john.doe@example.com</span
                >
              </div>
            </li>

            <!-- Menu Items -->
            <div class="p-2 d-flex flex-column gap-1 mt-3">
              <li>
                <a
                  class="dropdown-item py-2 px-2 rounded-3 d-flex align-items-center gap-3 text-dark fw-medium"
                  href="#"
                  style="font-size: 0.85rem"
                >
                  <div
                    class="rounded d-flex align-items-center justify-content-center text-muted"
                    style="width: 32px; height: 32px; background-color: #f1f5f9"
                  >
                    <i class="bi bi-person" />
                  </div>
                  My Profile
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item py-2 px-2 rounded-3 d-flex align-items-center gap-3 text-dark fw-medium"
                  href="#"
                  style="font-size: 0.85rem"
                >
                  <div
                    class="rounded d-flex align-items-center justify-content-center text-muted"
                    style="width: 32px; height: 32px; background-color: #f1f5f9"
                  >
                    <i class="bi bi-sliders" />
                  </div>
                  Preferences
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item py-2 px-2 rounded-3 d-flex align-items-center gap-3 text-dark fw-medium"
                  href="#"
                  style="font-size: 0.85rem"
                >
                  <div
                    class="rounded d-flex align-items-center justify-content-center text-muted"
                    style="width: 32px; height: 32px; background-color: #f1f5f9"
                  >
                    <i class="bi bi-activity" />
                  </div>
                  Activity Log
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item py-2 px-2 rounded-3 d-flex align-items-center gap-3 text-dark fw-medium"
                  href="#"
                  style="font-size: 0.85rem"
                >
                  <div
                    class="rounded d-flex align-items-center justify-content-center text-muted"
                    style="width: 32px; height: 32px; background-color: #f1f5f9"
                  >
                    <i class="bi bi-credit-card" />
                  </div>
                  Billing
                </a>
              </li>
            </div>

            <li>
              <hr class="dropdown-divider m-0" style="border-color: var(--border); opacity: 1" />
            </li>

            <!-- Footer Dropdown -->
            <li class="p-2">
              <a
                class="dropdown-item py-2 rounded-3 text-danger fw-bold d-flex align-items-center justify-content-center gap-2"
                href="#"
                style="font-size: 0.85rem"
              >
                <i class="bi bi-box-arrow-right" /> Sign Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>
