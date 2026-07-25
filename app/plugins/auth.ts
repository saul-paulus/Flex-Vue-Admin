import { createHttpClient } from '~/infrastructure/api/httpClient';
import { AuthApiRepository } from '~/infrastructure/api/AuthApiRepository';
import { MockAuthRepository } from '~/infrastructure/__mocks__/MockAuthRepository';
import { UserApiRepository } from '~/infrastructure/api/UserApiRepository';
import { MockUserRepository } from '~/infrastructure/__mocks__/MockUserRepository';
import { RoleApiRepository } from '~/infrastructure/api/RoleApiRepository';
import { MockRoleRepository } from '~/infrastructure/__mocks__/MockRoleRepository';
import { cookieTokenStorage } from '~/infrastructure/storage/tokenStorage';

import { LoginUseCase } from '~/application/auth/LoginUseCase';
import { LogoutUseCase } from '~/application/auth/LogoutUseCase';
import { GetCurrentUserUseCase } from '~/application/auth/GetCurrentUserUseCase';
import { GetUsersUseCase } from '~/application/users/GetUsersUseCase';
import { GetUserByIdUseCase } from '~/application/users/GetUserByIdUseCase';
import { GetRolesUseCase } from '~/application/roles/GetRolesUseCase';
import { SaveRolePermissionsUseCase } from '~/application/roles/SaveRolePermissionsUseCase';

import type { TokenProvider } from '~/domain/ports/TokenPorts';
import type { AuthRepository } from '~/domain/repositories/AuthRepository';
import type { UserRepository } from '~/domain/repositories/UserRepository';
import type { RoleRepository } from '~/domain/repositories/RoleRepository';

/**
 * Application DI Plugin — Dependency Injection Composition Root.
 *
 * Assembles all Domain Repositories and Application Use Cases
 * for Auth, Users, and Roles subsystems.
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

  // ── Environment Flag ──
  const useMock = import.meta.dev && !runtimeConfig.public.apiBase;

  // ── Repositories ──
  const authRepository: AuthRepository = useMock ? new MockAuthRepository() : new AuthApiRepository(httpClient);
  const userRepository: UserRepository = useMock ? new MockUserRepository() : new UserApiRepository(httpClient);
  const roleRepository: RoleRepository = useMock ? new MockRoleRepository() : new RoleApiRepository(httpClient);

  if (useMock) {
    console.info('[DI Plugin] Using Mock Repositories (development mode, no API configured)');
  }

  // ── Use Cases ──
  const loginUseCase = new LoginUseCase(authRepository, cookieTokenStorage);
  const logoutUseCase = new LogoutUseCase(authRepository, cookieTokenStorage);
  const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);

  const getUsersUseCase = new GetUsersUseCase(userRepository);
  const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);

  const getRolesUseCase = new GetRolesUseCase(roleRepository);
  const saveRolePermissionsUseCase = new SaveRolePermissionsUseCase(roleRepository);

  return {
    provide: {
      authRepository,
      userRepository,
      roleRepository,
      loginUseCase,
      logoutUseCase,
      getCurrentUserUseCase,
      getUsersUseCase,
      getUserByIdUseCase,
      getRolesUseCase,
      saveRolePermissionsUseCase,
      tokenStorage: cookieTokenStorage,
    },
  };
});
