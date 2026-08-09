import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { AuthUser } from '@domain/auth/entities/AuthSession';

/**
 * Auth Store — Thin reactive state container for authentication.
 *
 * This store ONLY manages reactive state. All business logic
 * is delegated to use cases in the application layer.
 *
 * Responsibilities:
 * - Hold current auth token (reactive)
 * - Hold current user data (reactive)
 * - Provide computed helpers (isAuthenticated)
 * - Expose simple setters/clearers
 *
 * NOT responsible for:
 * - API calls (use cases handle this)
 * - Token persistence (TokenStoragePort handles this)
 * - Business validation (domain layer handles this)
 */
export const useAuthStore = defineStore(
  'auth',
  () => {
    // ──── State ────
    const token = ref<string | null>(null);
    const user = ref<AuthUser | null>(null);

    // ──── Computed ────
    const isAuthenticated = computed(() => !!token.value && !!user.value);
    const username = computed(() => user.value?.username ?? '');
    const personalId = computed(() => user.value?.personalId ?? '');

    // ──── Actions ────

    /** Set authentication data after successful login */
    function setAuth(newToken: string, newUser: AuthUser) {
      token.value = newToken;
      user.value = newUser;
    }

    /** Update only the user profile */
    function setUser(newUser: AuthUser) {
      user.value = newUser;
    }

    /** Set only the token (before user is fetched) */
    function setToken(newToken: string) {
      token.value = newToken;
    }

    /** Clear all auth state (logout) */
    function clearAuth() {
      token.value = null;
      user.value = null;
    }

    return {
      // State
      token,
      user,
      // Computed
      isAuthenticated,
      username,
      personalId,
      // Actions
      setAuth,
      setUser,
      setToken,
      clearAuth,
    };
  },
  {
    persist: true,
  }
);
