<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMenu } from '~/composables/useMenu';

defineProps({ isOpen: Boolean });
defineEmits(['close']);

const route = useRoute();
const { menuItems, getMenu } = useMenu();

onMounted(async () => {
  await getMenu();
});

// Accordion state for active submenus
const openMenu = ref<string | null>(route.path.startsWith('/users') ? 'users' : null);

watch(
  () => route.path,
  (newPath) => {
    const parentItem = menuItems.value.find((item) =>
      item.children?.some((child) => child.route && newPath.startsWith(child.route))
    );
    openMenu.value = parentItem ? parentItem.id : null;
  }
);

const toggleMenu = (menuId: string) => {
  openMenu.value = openMenu.value === menuId ? null : menuId;
};
</script>

<template>
  <aside class="sidebar d-flex flex-column shadow-sm" :class="{ show: isOpen, 'hide-desktop': !isOpen }">
    <!-- Navigation -->
    <div class="sidebar-nav flex-grow-1 overflow-auto py-3">
      <ul class="nav flex-column mb-auto gap-1">
        <template v-for="item in menuItems" :key="item.id">
          <!-- Section Divider Header -->
          <li v-if="item.isDivider" class="px-3 mt-4 mb-2 text-uppercase text-tertiary fw-bold nav-section-title">
            {{ item.sectionHeader || item.label }}
          </li>

          <!-- MenuItem with Children (Accordion) -->
          <li v-else-if="item.children && item.children.length > 0" class="nav-item px-3 mb-1 mt-1">
            <a
              href="#"
              class="nav-link menu-link px-3 py-2 d-flex align-items-center justify-content-between"
              :class="{ 'active-parent': item.children.some((c) => c.route && $route.path.startsWith(c.route)) }"
              @click.prevent="toggleMenu(item.id)"
            >
              <div class="d-flex align-items-center gap-3">
                <i v-if="item.icon" class="bi" :class="item.icon" />
                <span>{{ item.label }}</span>
              </div>
              <i class="bi small" :class="openMenu === item.id ? 'bi-chevron-down' : 'bi-chevron-right'" />
            </a>
            <!-- Submenu List -->
            <ul v-show="openMenu === item.id" class="nav flex-column ms-4 mt-1 pe-3 gap-1 submenu-list border-l-apple">
              <li v-for="child in item.children" :key="child.id" class="nav-item">
                <NuxtLink
                  v-slot="{ isExactActive }"
                  :to="child.route || '#'"
                  class="nav-link text-secondary py-1 ms-2 d-flex align-items-center gap-2 sub-link"
                  exact-active-class="active-sub"
                >
                  <i class="bi fs-xs" :class="isExactActive ? 'bi-circle-fill' : 'bi-circle'" />
                  <span>{{ child.label }}</span>
                </NuxtLink>
              </li>
            </ul>
          </li>

          <!-- Single MenuItem (Direct Link) -->
          <li v-else class="nav-item px-3 mb-1">
            <NuxtLink
              :to="item.route || '#'"
              class="nav-link menu-link px-3 py-2 d-flex align-items-center justify-content-between fw-medium"
              exact-active-class="active"
            >
              <div class="d-flex align-items-center gap-3">
                <i v-if="item.icon" class="bi" :class="item.icon" />
                <span>{{ item.label }}</span>
              </div>
              <span
                v-if="item.badge"
                class="badge rounded-pill text-white fs-10"
                :class="`bg-${item.badgeVariant || 'primary'}`"
              >
                {{ item.badge }}
              </span>
            </NuxtLink>
          </li>
        </template>
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
  background: rgba(10, 132, 255, 0.15) !important;
  border-radius: var(--radius-sm);
  padding-left: 8px !important;
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
