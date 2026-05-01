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
      if (payload.id_personal === '007100' && payload.password === '90') {
        // Mock successful login
        this.token = 'dummy-token-12345';
        this.user = {
          id: 1,
          id_personal: '007100',
          name: 'Administrator',
          email: 'admin@niceadmin.com',
        } as AuthUser;
        return;
      }

      // Simulate API call failure for any other credentials
      throw new Error('Invalid Id Personal or Password');
    },

    logout() {
      this.token = null;
      this.user = null;
    },
  },
});
