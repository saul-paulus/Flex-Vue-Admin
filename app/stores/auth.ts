import { defineStore } from 'pinia';
import type { AuthUser, LoginPayload } from '~/domain/entities/Auth';
import { AuthService } from '~/infrastructure/api/AuthService';
import { tokenStorage } from '~/infrastructure/storage/tokenStorage';

function getAuthRepository() {
  try {
    const nuxtApp = useNuxtApp();
    if (nuxtApp?.$authRepository) {
      return nuxtApp.$authRepository;
    }
  } catch (_e) {
    // ignore if called outside nuxt context
  }
  return new AuthService();
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: (tokenStorage.token || null) as string | null | undefined,
    user: null as AuthUser | null | undefined,
  }),
  persist: true,

  actions: {
    async fetchAuthlogin(payload: LoginPayload) {
      const authRepository = getAuthRepository();
      const response = await authRepository.login(payload);

      if (response && response.success && response.data?.access_token) {
        this.token = response.data.access_token;
        tokenStorage.token = response.data.access_token;

        await this.fetchUserMe();
        return response;
      } else {
        throw new Error(response?.message || 'Invalid Id Personal or Password');
      }
    },

    async login(id_personal: string, password: string) {
      return this.fetchAuthlogin({ id_personal, password });
    },

    async fetchUserMe() {
      const authRepository = getAuthRepository();
      try {
        const response = await authRepository.getUserMe();
        if (response && response.success && response.data) {
          this.user = response.data;
          return response.data;
        }
      } catch (error) {
        console.error('Failed to fetch user me:', error);
      }
      return null;
    },

    clearToken() {
      this.token = null;
      tokenStorage.clear();
    },

    async logout() {
      const authRepository = getAuthRepository();
      try {
        await authRepository.logout();
      } catch (_e) {
        // ignore logout API error
      } finally {
        this.token = null;
        this.user = null;
        tokenStorage.clear();
      }
    },
  },
});
