<script setup lang="ts">
import { defineProps } from 'vue';
import type { NuxtError } from '#app';
import { clearError, useRouter } from 'nuxt/app';

defineProps({
  error: Object as () => NuxtError,
});

const router = useRouter();

const handleBackHome = () => {
  clearError({ redirect: '/' });
};

const handleGoBack = () => {
  clearError();
  router.back();
};
</script>

<template>
  <div class="vw-100 vh-100 d-flex align-items-center justify-content-center bg-light position-relative overflow-hidden">
    <!-- Decorative background elements -->
    <div
      class="position-absolute top-0 start-0 w-100 h-100"
      style="pointer-events: none; z-index: 0;"
    >
      <div
        class="position-absolute"
        style="top: -15%; right: -5%; width: 50vh; height: 50vh; border-radius: 50%; background: radial-gradient(circle, rgba(13,148,136,0.08) 0%, rgba(255,255,255,0) 70%);"
      />
      <div
        class="position-absolute"
        style="bottom: -20%; left: -10%; width: 60vh; height: 60vh; border-radius: 50%; background: radial-gradient(circle, rgba(13,148,136,0.06) 0%, rgba(255,255,255,0) 70%);"
      />
    </div>

    <!-- Error Card -->
    <div
      class="card border-0 shadow-sm bg-white p-5 text-center position-relative z-1 d-flex flex-column align-items-center"
      style="border-radius: var(--apple-radius, 16px); max-width: 520px; width: 90%;"
    >
      <!-- Top Badge -->
      <div class="d-flex justify-content-center align-items-center mb-4 gap-2">
        <i
          class="bi bi-heptagon-half fs-4"
          style="color: var(--accent);"
        />
        <span
          class="badge rounded-pill fw-bolder px-3 py-2"
          style="background-color: #e0f2fe; color: var(--accent); font-size: 0.65rem; letter-spacing: 0.8px;"
        >
          ERROR {{ error?.statusCode || 404 }}
        </span>
      </div>

      <!-- Main Number -->
      <h1
        class="fw-bolder mb-2"
        style="color: var(--title-color); font-size: 5.5rem; letter-spacing: -2px; line-height: 1;"
      >
        {{ error?.statusCode || 404 }}
      </h1>

      <!-- Subtitle -->
      <h4
        class="fw-bold mb-3"
        style="color: var(--title-color);"
      >
        We couldn't find that page
      </h4>

      <!-- Description -->
      <p
        class="text-muted small mb-5 lh-lg"
        style="font-size: 0.85rem; max-width: 340px;"
      >
        The link may be outdated or the page may have moved. Try navigating from your workspace home.
      </p>

      <!-- Action Buttons -->
      <div class="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 w-100 px-3">
        <button
          class="btn text-white fw-medium shadow-sm d-flex align-items-center justify-content-center gap-2 flex-grow-1 py-2"
          style="background-color: var(--accent); border-color: var(--accent); border-radius: 8px; font-size: 0.9rem;"
          @click="handleBackHome"
        >
          <i class="bi bi-house-door" /> Back Home
        </button>
        <button
          class="btn btn-outline-secondary fw-medium d-flex align-items-center justify-content-center gap-2 flex-grow-1 py-2 bg-white"
          style="border-radius: 8px; font-size: 0.9rem; border-color: #cbd5e1; color: #475569;"
          @click="handleGoBack"
        >
          <i class="bi bi-arrow-left" /> Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-light {
  background-color: #f8fafc !important;
}
.btn {
  transition: all 0.2s ease;
}
.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1) !important;
}
.btn-outline-secondary:hover {
  background-color: #f1f5f9 !important;
  color: #0f172a !important;
}
</style>
