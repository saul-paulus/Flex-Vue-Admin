import { defineStore } from 'pinia';
import type { AuthUser } from '~/domain/entities/Auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null | undefined,
    user: null as AuthUser | null | undefined,
  }),
  persist: true,

  actions: {
    async fetchAuthlogin(payload: { id_personal: string; password: string }) {
      const { $authRepository } = useNuxtApp();

      const result = await $authRepository.login(payload);
      const token = result.data.access_token;

      this.token = token;
      this.user = result.data.user;
    },

    logout() {
      this.token = null;
      this.user = null;
    },
  },
});
