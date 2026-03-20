import { describe, expect, it, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import { useAuthStore } from '~/stores/auth';
import { tokenStorage } from '~/infrastructure/storage/tokenStorage';

// Use vi.hoisted for stable mock references
const { mockRepo } = vi.hoisted(() => ({
  mockRepo: {
    login: vi.fn(),
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
    const mockToken = 'new-token';
    mockRepo.login.mockResolvedValueOnce(mockToken);

    await store.login('user123', 'pass123');

    expect(store.token).toBe(mockToken);
    expect(mockRepo.login).toHaveBeenCalledWith({ id_personal: 'user123', password: 'pass123' });
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
    store.user = { id_personal: '1', name: 'Test User' };

    store.logout();

    expect(store.token).toBeNull();
    expect(store.user).toBeNull();
    expect(tokenStorage.clear).toHaveBeenCalled();
  });
});
