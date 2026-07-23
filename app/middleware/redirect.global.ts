import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  // Route logout: eksekusi logout dan hapus token, lalu redirect ke /auth/login
  if (to.path === '/auth/logout') {
    await authStore.logout();
    return navigateTo('/auth/login');
  }

  // Jika user sudah login (memiliki token/user aktif) dan mencoba membuka /auth/login:
  // Cegah akses dan redirect ke /dashboard
  if ((authStore.token || authStore.user) && to.path === '/auth/login') {
    return navigateTo('/dashboard');
  }

  // Redirect ke /auth/login jika belum terautentikasi dan tidak di halaman login
  if (!authStore.token && !authStore.user && to.path !== '/auth/login') {
    return navigateTo('/auth/login');
  }

  // Redirect root ke /dashboard
  if (to.path === '/') {
    return navigateTo('/dashboard');
  }
});
