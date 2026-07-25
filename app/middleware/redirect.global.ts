/**
 * Global Auth Redirect Middleware
 *
 * Handles authentication-based route protection:
 * 1. /auth/logout → Execute logout and redirect to login
 * 2. Authenticated user accessing /auth/login → Redirect to dashboard
 * 3. Unauthenticated user accessing protected routes → Redirect to login
 * 4. Root path → Redirect to dashboard
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.token;
  const isAuthRoute = to.path.startsWith('/auth/');

  // 1. Handle logout route
  if (to.path === '/auth/logout') {
    try {
      const { $logoutUseCase } = useNuxtApp();
      await $logoutUseCase.execute();
    } catch {
      // Logout errors are non-critical
    }
    authStore.clearAuth();
    return navigateTo('/auth/login');
  }

  // 2. Prevent authenticated users from accessing login page
  if (isAuthenticated && to.path === '/auth/login') {
    return navigateTo('/dashboard');
  }

  // 3. Protect non-auth routes from unauthenticated access
  if (!isAuthenticated && !isAuthRoute) {
    return navigateTo('/auth/login');
  }

  // 4. Redirect root to dashboard
  if (to.path === '/') {
    return navigateTo(isAuthenticated ? '/dashboard' : '/auth/login');
  }
});
