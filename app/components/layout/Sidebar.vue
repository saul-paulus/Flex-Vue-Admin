<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['close']);
const route = useRoute();
const isUsersMenuOpen = ref(route.path.startsWith('/users'));
</script>

<template>
  <aside class="sidebar bg-white border-end d-flex flex-column shadow-sm" :class="{ show: isOpen, 'hide-desktop': !isOpen }">
    <!-- Navigation -->
    <div class="sidebar-nav flex-grow-1 overflow-auto py-3">
      <ul class="nav flex-column mb-auto gap-1">
        <li class="nav-item px-3 mb-1">
          <NuxtLink
            to="/"
            class="nav-link menu-link active rounded px-3 py-2 d-flex align-items-center justify-content-between text-dark fw-medium"
          >
            <div class="d-flex align-items-center gap-3">
              <i class="bi bi-grid-fill"></i> Dashboard
            </div>
            <span class="badge bg-primary rounded-pill fs-60">MAIN</span>
          </NuxtLink>
        </li>

        <li class="nav-item px-3 mb-1 mt-2">
          <a
            href="#"
            @click.prevent="isUsersMenuOpen = !isUsersMenuOpen"
            class="nav-link menu-link rounded px-3 py-2 d-flex align-items-center justify-content-between text-muted"
            :style="isUsersMenuOpen ? 'background-color: var(--muted-bg); color: var(--accent) !important; font-weight: 600;' : ''"
          >
            <div class="d-flex align-items-center gap-3"><i class="bi bi-people"></i> Users</div>
            <i class="bi small" :class="isUsersMenuOpen ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
          </a>
          <!-- Submenu Container -->
          <ul class="nav flex-column ms-4 mt-2 pe-3 gap-1 submenu-list" v-show="isUsersMenuOpen" style="border-left: 1px solid var(--border);">
            <li class="nav-item">
              <NuxtLink to="/users" class="nav-link text-muted py-1 ms-2 param-link d-flex align-items-center gap-2" exact-active-class="active-submenu text-primary fw-bold" style="font-size: 0.8rem;">
                <i class="bi bi-circle fs-60" :class="{ 'text-primary': $route.path === '/users' }"></i> Users List
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/users/view" class="nav-link text-muted py-1 ms-2 param-link d-flex align-items-center gap-2" exact-active-class="active-submenu text-primary fw-bold" style="font-size: 0.8rem;">
                <i class="bi bi-circle fs-60" :class="{ 'text-primary': $route.path === '/users/view' }"></i> User View
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/users/edit" class="nav-link text-muted py-1 ms-2 param-link d-flex align-items-center gap-2" exact-active-class="active-submenu text-primary fw-bold" style="font-size: 0.8rem;">
                <i class="bi bi-circle fs-60" :class="{ 'text-primary': $route.path === '/users/edit' }"></i> User Edit
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/users/profile" class="nav-link text-muted py-1 ms-2 param-link d-flex align-items-center gap-2" exact-active-class="active-submenu text-primary fw-bold" style="font-size: 0.8rem;">
                <i class="bi bi-circle fs-60" :class="{ 'text-primary': $route.path === '/users/profile' }"></i> Profile
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/users/settings" class="nav-link text-muted py-1 ms-2 param-link d-flex align-items-center gap-2" exact-active-class="active-submenu text-primary fw-bold" style="font-size: 0.8rem;">
                <i class="bi bi-circle fs-60" :class="{ 'text-primary': $route.path === '/users/settings' }"></i> Settings
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/users/roles" class="nav-link text-muted py-1 ms-2 param-link d-flex align-items-center gap-2" exact-active-class="active-submenu text-primary fw-bold" style="font-size: 0.8rem;">
                <i class="bi bi-circle fs-60" :class="{ 'text-primary': $route.path === '/users/roles' }"></i> Roles &amp; Permissions
              </NuxtLink>
            </li>
          </ul>
        </li>

        <li class="nav-item px-3 mb-1">
          <NuxtLink
            to="#"
            class="nav-link menu-link rounded px-3 py-2 d-flex align-items-center justify-content-between text-muted"
          >
            <div class="d-flex align-items-center gap-3">
              <i class="bi bi-shield-lock"></i> Authentication
            </div>
            <i class="bi bi-chevron-right small"></i>
          </NuxtLink>
        </li>

        <li
          class="px-3 mt-4 mb-2 text-uppercase text-muted fw-bold nav-section-title"
        >
          Productivity Apps
        </li>

        <li class="nav-item px-3 mb-1">
          <NuxtLink
            to="#"
            class="nav-link menu-link rounded px-3 py-2 d-flex align-items-center text-muted gap-3"
          >
            <i class="bi bi-calendar3"></i> Calendar
          </NuxtLink>
        </li>

        <li class="nav-item px-3 mb-1">
          <NuxtLink
            to="#"
            class="nav-link menu-link rounded px-3 py-2 d-flex align-items-center text-muted gap-3"
          >
            <i class="bi bi-kanban"></i> Kanban Board
          </NuxtLink>
        </li>

        <li class="nav-item px-3 mb-1">
          <NuxtLink
            to="#"
            class="nav-link menu-link rounded px-3 py-2 d-flex align-items-center text-muted gap-3"
          >
            <i class="bi bi-chat-square-dots"></i> Chat
          </NuxtLink>
        </li>

        <li
          class="px-3 mt-4 mb-2 text-uppercase text-muted fw-bold nav-section-title"
        >
          Interface
        </li>

        <li class="nav-item px-3 mb-1">
          <NuxtLink
            to="#"
            class="nav-link menu-link rounded px-3 py-2 d-flex align-items-center justify-content-between text-muted"
          >
            <div class="d-flex align-items-center gap-3">
              <i class="bi bi-ui-checks-grid"></i> Components
            </div>
            <i class="bi bi-chevron-right small"></i>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- User Footer on Sidebar (from your sketch) -->
    <div class="sidebar-footer p-3 m-3 bg-light rounded shadow-sm border">
      <div class="d-flex align-items-center">
        <img
          src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff"
          alt="User"
          class="rounded-circle me-3"
          width="36"
          height="36"
        />
        <div class="w-100 d-flex justify-content-between align-items-center">
          <div>
            <h6 class="mb-0 fw-bold fs-80">John Doe</h6>
            <div class="text-muted text-uppercase fs-65">PRODUCT ADMIN</div>
          </div>
          <button class="btn btn-sm btn-link text-muted p-0 border-0">
            <i class="bi bi-box-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.param-link {
  transition: all 0.2s ease;
  border-radius: 4px;
}
.param-link:hover {
  background-color: var(--muted-bg);
}
.active-submenu {
  color: var(--accent) !important;
  background-color: var(--row-hover) !important;
}
</style>


