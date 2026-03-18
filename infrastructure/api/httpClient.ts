import { $fetch, type FetchOptions } from 'ofetch';
import { useAuthStore } from '~/store/auth';

const fetcher = $fetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  onRequest({ options }) {
    // Dapatkan instance auth store
    const authStore = useAuthStore();

    // Sisipkan Bearer token ke authorization headers jika token aktif
    if (authStore.token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${authStore.token}`,
      } as any;
    }
  },
  onResponseError({ response }) {
    if (response.status === 401) {
      // Skenario token mati / expired
      const authStore = useAuthStore();
      authStore.clearToken();
      // Paksa navigasi ke halaman login
      navigateTo('/login');
    }
  },
});

export const httpClient = {
  get<T>(url: string, options?: FetchOptions<'json'>) {
    return fetcher<T>(url, { ...options, method: 'GET' });
  },
  post<T>(url: string, body?: any, options?: FetchOptions<'json'>) {
    return fetcher<T>(url, { ...options, method: 'POST', body });
  },
  put<T>(url: string, body?: any, options?: FetchOptions<'json'>) {
    return fetcher<T>(url, { ...options, method: 'PUT', body });
  },
  delete<T>(url: string, options?: FetchOptions<'json'>) {
    return fetcher<T>(url, { ...options, method: 'DELETE' });
  },
};
