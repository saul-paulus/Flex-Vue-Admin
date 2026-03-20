import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  // Redirect to login if not authenticated and not on login page
  if (!authStore.token && to.path !== '/auth/login') {
    return navigateTo('/auth/login');
  }

  // Redirect root to dashboard
  if (to.path === '/') {
    return navigateTo('/dashboard');
  }
});
