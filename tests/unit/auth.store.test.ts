import { describe, expect, it, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import { useAuthStore } from '~/stores/auth';
import { tokenStorage } from '~/infrastructure/storage/tokenStorage';

// Use vi.hoisted for stable mock references
const { mockRepo } = vi.hoisted(() => ({
  mockRepo: {
    login: vi.fn(),
    getUserMe: vi.fn(),
  },
}));

// Mock tokenStorage
vi.mock('~/infrastructure/storage/tokenStorage', () => ({
  tokenStorage: {
    get token() {
      return null;
    },
    set token(_: any) {},
    clear: vi.fn(),
  },
}));

// Mock Nuxt globals
vi.stubGlobal(
  'useNuxtApp',
  vi.fn(() => ({
    $authRepository: mockRepo,
  }))
);

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('should have initial state', () => {
    const store = useAuthStore();
    expect(store.token).toBeNull();
    expect(store.user).toBeNull();
  });

  it('should login successfully', async () => {
    const store = useAuthStore();
    const mockLoginResponse = {
      success: true,
      responseCode: 200,
      message: 'User berhasil login',
      data: {
        access_token: 'new-token',
        token_type: 'Bearer',
        expires_in: 3600,
      },
      meta: null,
      links: null,
    };
    const mockUserResponse = {
      success: true,
      responseCode: 200,
      message: 'User berhasil diambil',
      data: {
        id: 9,
        username: 'Test User',
        id_personal: '1234567890',
        codeuker: '6617',
        id_wewenang: 1,
        is_active: 1,
      },
      meta: null,
      links: null,
    };

    mockRepo.login.mockResolvedValueOnce(mockLoginResponse);
    mockRepo.getUserMe.mockResolvedValueOnce(mockUserResponse);

    await store.login('1234567890', 'password');

    expect(store.token).toBe('new-token');
    expect(store.user?.username).toBe('Test User');
    expect(mockRepo.login).toHaveBeenCalledWith({ id_personal: '1234567890', password: 'password' });
    expect(mockRepo.getUserMe).toHaveBeenCalled();
  });

  it('should clearToken correctly', () => {
    const store = useAuthStore();
    store.token = 'some-token';

    store.clearToken();

    expect(store.token).toBeNull();
    expect(tokenStorage.clear).toHaveBeenCalled();
  });

  it('should logout correctly', () => {
    const store = useAuthStore();
    store.token = 'some-token';
    store.user = {
      id: 9,
      username: 'Test User',
      id_personal: '1234567890',
      codeuker: '6617',
      id_wewenang: 1,
      is_active: 1,
    };

    store.logout();

    expect(store.token).toBeNull();
    expect(store.user).toBeNull();
    expect(tokenStorage.clear).toHaveBeenCalled();
  });
});
