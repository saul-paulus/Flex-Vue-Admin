<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';

const authStore = useAuthStore();
const user = computed(() => authStore.user);

defineProps({ isOpen: Boolean });

const _emit = defineEmits(['close']);
const route = useRoute();

// Accordion state
const openMenu = ref<string | null>(route.path.startsWith('/users') ? 'users' : null);

// Close other menus & open correct one on route change
watch(
  () => route.path,
  (newPath) => {
    if (newPath.startsWith('/users')) {
      openMenu.value = 'users';
    } else {
      // If navigating to Dashboard or others, close the accordion
      openMenu.value = null;
    }
  }
);

const toggleMenu = (menu: string) => {
  openMenu.value = openMenu.value === menu ? null : menu;
};

const handleLogout = async () => {
  await authStore.logout();
  await navigateTo('/auth/login');
};
</script>

<template>
  <aside class="sidebar d-flex flex-column shadow-sm" :class="{ show: isOpen, 'hide-desktop': !isOpen }">
    <!-- Navigation -->
    <div class="sidebar-nav flex-grow-1 overflow-auto py-3">
      <ul class="nav flex-column mb-auto gap-1">
        <li class="nav-item px-3 mb-1">
          <NuxtLink
            to="/dashboard"
            class="nav-link menu-link px-3 py-2 d-flex align-items-center justify-content-between fw-medium"
            exact-active-class="active"
          >
            <div class="d-flex align-items-center gap-3">
              <i class="bi bi-grid-fill" />
              <span>Dashboard</span>
            </div>
            <span class="badge rounded-pill bg-primary text-white fs-10"> MAIN </span>
          </NuxtLink>
        </li>
        <li class="nav-item px-3 mb-1 mt-2">
          <a
            href="#"
            class="nav-link menu-link px-3 py-2 d-flex align-items-center justify-content-between"
            :class="{ 'active-parent': $route.path.startsWith('/users') }"
            @click.prevent="toggleMenu('users')"
          >
            <div class="d-flex align-items-center gap-3">
              <i class="bi bi-people" />
              <span>Users</span>
            </div>
            <i class="bi small" :class="openMenu === 'users' ? 'bi-chevron-down' : 'bi-chevron-right'" />
          </a>
          <!-- Submenu Container -->
          <ul v-show="openMenu === 'users'" class="nav flex-column ms-4 mt-1 pe-3 gap-1 submenu-list border-l-apple">
            <li class="nav-item">
              <NuxtLink
                v-slot="{ isExactActive }"
                to="/users"
                class="nav-link text-secondary py-1 ms-2 d-flex align-items-center gap-2 sub-link"
                exact-active-class="active-sub"
              >
                <i class="bi fs-xs" :class="isExactActive ? 'bi-circle-fill' : 'bi-circle'" />
                <span>Users List</span>
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink
                v-slot="{ isExactActive }"
                to="/users/view"
                class="nav-link text-secondary py-1 ms-2 d-flex align-items-center gap-2 sub-link"
                exact-active-class="active-sub"
              >
                <i class="bi fs-xs" :class="isExactActive ? 'bi-circle-fill' : 'bi-circle'" />
                <span>User View</span>
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink
                v-slot="{ isExactActive }"
                to="/users/roles"
                class="nav-link text-secondary py-1 ms-2 d-flex align-items-center gap-2 sub-link"
                exact-active-class="active-sub"
              >
                <i class="bi fs-xs" :class="isExactActive ? 'bi-circle-fill' : 'bi-circle'" />
                <span>Roles & Permissions</span>
              </NuxtLink>
            </li>
          </ul>
        </li>
        <li class="px-3 mt-4 mb-2 text-uppercase text-tertiary fw-bold nav-section-title">Productivity Apps</li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.sub-link {
  font-size: var(--fs-sm);
  transition: var(--transition-fast);
  border-radius: var(--radius-sm);
}

.sub-link:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--text-primary) !important;
}

[data-bs-theme='dark'] .sub-link:hover {
  background: rgba(255, 255, 255, 0.1);
}

.active-sub {
  color: var(--accent) !important;
  font-weight: var(--fw-semibold);
}

.active-parent {
  color: var(--accent) !important;
  font-weight: var(--fw-semibold);
}

.nav-section-title {
  letter-spacing: 0.5px;
  font-size: 11px;
}
</style>
