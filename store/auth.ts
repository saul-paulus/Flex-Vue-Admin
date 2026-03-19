import {defineStore} from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as any | null,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    clearToken() {
      this.token = null;
      this.user = null;
    },
  },
  persist: true,  // Requires pinia-plugin-persistedstate
});
