import { createHttpClient } from '~/infrastructure/api/httpClient';
import { AuthApiRepository } from '~/infrastructure/api/repositories/AuthApiRepository';
import { cookieTokenStorage } from '~/infrastructure/storage/tokenStorage';

import { LoginUseCase } from '~/application/auth/LoginUseCase';
import { LogoutUseCase } from '~/application/auth/LogoutUseCase';
import { GetCurrentUserUseCase } from '~/application/auth/GetCurrentUserUseCase';

import type { TokenProvider } from '@domain/auth/TokenPorts';
import type { AuthRepository } from '@domain/auth/AuthRepository';

/**
 * Application DI Plugin — Dependency Injection Composition Root.
 *
 * Assembles Auth Domain Repository and Login Application Use Cases.
 * Other subsystems (Dashboard, Menu, Roles, Users) use static data directly in UI.
 */
export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const authStore = useAuthStore();

  // ── Token Provider ──
  const tokenProvider: TokenProvider = {
    getToken: () => authStore.token,
  };

  // ── HTTP Client ──
  const httpClient = createHttpClient(tokenProvider, {
    baseURL: (runtimeConfig.public.apiBase as string) || '/api',
    onUnauthorized: () => {
      authStore.clearAuth();
      cookieTokenStorage.clear();
      navigateTo('/auth/login');
    },
  });

  // ── Auth Repository ──
  const authRepository: AuthRepository = new AuthApiRepository(httpClient);

  // ── Auth Use Cases ──
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
