import { defineStore } from 'pinia';
import type { AuthUser } from '~/domain/entities/Auth';
import { tokenStorage } from '~/infrastructure/storage/tokenStorage';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: tokenStorage.token || (null as string | null),
    user: null as AuthUser | null,
  }),

  actions: {
    async login(id_personal: string, password: string) {
      const { $authRepository } = useNuxtApp();

      const result = await $authRepository.login({ id_personal, password });

      this.token = result;
      tokenStorage.token = result;
    },

    clearToken() {
      this.token = null;
      tokenStorage.clear();
    },

    logout() {
      this.clearToken();
      this.user = null;
    },
  },
});
