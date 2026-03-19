import { defineStore } from 'pinia';
import type { LoginPayload } from '~/domain/entities/Auth';
import { AuthService } from '~/infrastructure/api/AuthService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as any | null,
  }),
  actions: {
    async login(payload: LoginPayload) {
      try {
        const response = await AuthService.login(payload);

        // Simpan token JWT dan info user ke dalam state (PersistedState)
        this.setToken(response.token);
        this.setUser(response.user);

        return response;
      }
      catch (error: any) {
        // Ambil pesan error spesifik dari backend (jika ada), atau gunakan
        // error bawaan
        throw error?.data?.message
          || 'Login gagal! Periksa kembali Id Personal atau kata sandi Anda.';
      }
    },
    setToken(token: string) {
      this.token = token;
    },
    setUser(user: any) {
      this.user = user;
    },
    clearToken() {
      this.token = null;
      this.user = null;
    },
  },
  persist: true, // Requires pinia-plugin-persistedstate
});
