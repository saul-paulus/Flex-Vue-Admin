<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Auto close sidebar on narrow screens when navigating
const handleResize = () => {
  if (window.innerWidth < 768) {
    isSidebarOpen.value = false;
  }
  else {
    isSidebarOpen.value = true;
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <div class="admin-layout text-dark">
    <!-- Header Full Width -->
    <LayoutHeader @toggle-sidebar="toggleSidebar" />

    <div class="d-flex position-relative">
      <!-- Sidebar -->
      <LayoutSidebar
        :is-open="isSidebarOpen"
        @close="isSidebarOpen = false"
      />

      <!-- Main Content -->
      <div
        class="main-content flex-grow-1 bg-light"
        :class="{ 'sidebar-collapsed': !isSidebarOpen }"
      >
        <!-- Content Area -->
        <main class="content-wrapper p-3 p-md-4">
          <slot />
        </main>
      </div>

      <!-- Overlay for offcanvas menu on mobile -->
      <div
        v-if="isSidebarOpen"
        class="sidebar-overlay d-md-none"
        @click="isSidebarOpen = false"
      />
    </div>
  </div>
</template>
