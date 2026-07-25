import { $fetch, type FetchOptions } from 'ofetch';
import type { TokenProvider } from '~/domain/ports/TokenPorts';

/**
 * Creates a configured HTTP client instance.
 *
 * This factory function accepts a TokenProvider port so the HTTP client
 * does NOT depend on Pinia stores or any presentation-layer concern.
 * This respects Clean Architecture dependency rules:
 *   Domain ← Application ← Infrastructure ← Presentation
 *
 * @param tokenProvider - Port to retrieve the current auth token
 * @param options - Additional configuration
 */
export function createHttpClient(
  tokenProvider: TokenProvider,
  options: { baseURL?: string; onUnauthorized?: () => void } = {}
) {
  const fetcher = $fetch.create({
    baseURL: options.baseURL || '/api',
    timeout: 30000, // 30 second timeout

    onRequest({ options: fetchOptions }) {
      const token = tokenProvider.getToken();
      if (token) {
        fetchOptions.headers = {
          ...fetchOptions.headers,
          Authorization: `Bearer ${token}`,
        } as Record<string, string>;
      }
    },

    onResponseError({ response }) {
      if (response.status === 401 && options.onUnauthorized) {
        options.onUnauthorized();
      }
    },
  });

  return {
    get<T>(url: string, fetchOpts?: FetchOptions<'json'>) {
      return fetcher<T>(url, { ...fetchOpts, method: 'GET' });
    },
    post<T>(url: string, body?: unknown, fetchOpts?: FetchOptions<'json'>) {
      return fetcher<T>(url, { ...fetchOpts, method: 'POST', body });
    },
    put<T>(url: string, body?: unknown, fetchOpts?: FetchOptions<'json'>) {
      return fetcher<T>(url, { ...fetchOpts, method: 'PUT', body });
    },
    patch<T>(url: string, body?: unknown, fetchOpts?: FetchOptions<'json'>) {
      return fetcher<T>(url, { ...fetchOpts, method: 'PATCH', body });
    },
    delete<T>(url: string, fetchOpts?: FetchOptions<'json'>) {
      return fetcher<T>(url, { ...fetchOpts, method: 'DELETE' });
    },
  };
}

/** Type for the HTTP client instance */
export type HttpClient = ReturnType<typeof createHttpClient>;
