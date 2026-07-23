<script setup lang="ts">
const authStore = useAuthStore();

definePageMeta({
  layout: 'auth',
});

onMounted(async () => {
  await authStore.logout();
  await navigateTo('/auth/login');
});
</script>

<template>
  <div class="d-flex align-items-center justify-content-center vh-100">
    <div class="text-center">
      <div class="spinner-border text-primary mb-3" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="fs-sm text-secondary fw-medium">Logging out...</p>
    </div>
  </div>
</template>
