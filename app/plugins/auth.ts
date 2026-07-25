import { createHttpClient } from '~/infrastructure/api/httpClient';
import { AuthApiRepository } from '~/infrastructure/api/AuthApiRepository';
import { MockAuthRepository } from '~/infrastructure/__mocks__/MockAuthRepository';
import { cookieTokenStorage } from '~/infrastructure/storage/tokenStorage';
import { LoginUseCase } from '~/application/auth/LoginUseCase';
import { LogoutUseCase } from '~/application/auth/LogoutUseCase';
import { GetCurrentUserUseCase } from '~/application/auth/GetCurrentUserUseCase';
import type { TokenProvider } from '~/domain/ports/TokenPorts';
import type { AuthRepository } from '~/domain/repositories/AuthRepository';

/**
 * Auth Plugin — Dependency Injection wiring point.
 *
 * This plugin is the SINGLE place where all auth dependencies are assembled.
 * It creates concrete implementations and injects them into the Nuxt app context.
 *
 * Dependency graph:
 *   TokenProvider (reads from store/storage)
 *     └→ HttpClient (uses token for auth headers)
 *         └→ AuthApiRepository (uses httpClient for API calls)
 *             └→ Use Cases (LoginUseCase, LogoutUseCase, GetCurrentUserUseCase)
 *                 └→ Provided to components via useNuxtApp()
 */
export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const authStore = useAuthStore();

  // ── Token Provider: reads token from the store ──
  const tokenProvider: TokenProvider = {
    getToken: () => authStore.token,
  };

  // ── HTTP Client: configured with token provider ──
  const httpClient = createHttpClient(tokenProvider, {
    baseURL: (runtimeConfig.public.apiBase as string) || '/api',
    onUnauthorized: () => {
      authStore.clearAuth();
      cookieTokenStorage.clear();
      navigateTo('/auth/login');
    },
  });

  // ── Repository: choose between real API and mock based on environment ──
  const useMock = import.meta.dev && !runtimeConfig.public.apiBase;
  const authRepository: AuthRepository = useMock ? new MockAuthRepository() : new AuthApiRepository(httpClient);

  if (useMock) {
    console.info('[Auth Plugin] Using MockAuthRepository (development mode, no API configured)');
  }

  // ── Use Cases: assembled with their dependencies ──
  const loginUseCase = new LoginUseCase(authRepository, cookieTokenStorage);
  const logoutUseCase = new LogoutUseCase(authRepository, cookieTokenStorage);
  const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);

  return {
    provide: {
      authRepository,
      loginUseCase,
      logoutUseCase,
      getCurrentUserUseCase,
      tokenStorage: cookieTokenStorage,
    },
  };
});
