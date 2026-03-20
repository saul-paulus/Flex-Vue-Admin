<script setup lang="ts">
// Redirect to login or dashboard
definePageMeta({
  middleware: [
    function () {
      return navigateTo('/auth/login');
    },
  ],
});
</script>

<template>
  <div>Redirecting...</div>
</template>
