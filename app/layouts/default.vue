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
  } else {
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
  <div class="admin-layout text-dark" :class="{ 'sidebar-collapsed': !isSidebarOpen }">
    <!-- Header Full Width -->
    <LayoutHeader @toggle-sidebar="toggleSidebar" />

    <div class="d-flex position-relative">
      <!-- Sidebar -->
      <LayoutSidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

      <!-- Main Content -->
      <div class="main-content flex-grow-1">
        <!-- Content Area -->
        <main class="h-100">
          <slot />
        </main>
      </div>

      <div class="sidebar-overlay d-lg-none" :class="{ show: isSidebarOpen }" @click="isSidebarOpen = false" />
    </div>
  </div>
</template>
