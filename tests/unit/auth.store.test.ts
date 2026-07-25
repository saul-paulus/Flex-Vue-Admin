import { describe, expect, it, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import { useAuthStore } from '~/stores/auth';

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('should have initial state', () => {
    const store = useAuthStore();
    expect(store.token).toBeNull();
    expect(store.user).toBeNull();
    expect(store.isAuthenticated).toBe(false);
  });

  it('should setAuth correctly', () => {
    const store = useAuthStore();

    const mockUser = {
      id: 9,
      username: 'Test User',
      personalId: '1234567890',
      authorityLevel: 1,
      isActive: true,
    };

    store.setAuth('new-token', mockUser);

    expect(store.token).toBe('new-token');
    expect(store.user?.username).toBe('Test User');
    expect(store.isAuthenticated).toBe(true);
    expect(store.username).toBe('Test User');
    expect(store.personalId).toBe('1234567890');
  });

  it('should setToken correctly', () => {
    const store = useAuthStore();
    store.setToken('my-token');
    expect(store.token).toBe('my-token');
    // isAuthenticated requires both token AND user
    expect(store.isAuthenticated).toBe(false);
  });

  it('should setUser correctly', () => {
    const store = useAuthStore();
    const mockUser = {
      id: 9,
      username: 'Test User',
      personalId: '1234567890',
      authorityLevel: 1,
      isActive: true,
    };

    store.setUser(mockUser);
    expect(store.user?.username).toBe('Test User');
  });

  it('should clearAuth correctly', () => {
    const store = useAuthStore();

    store.setAuth('some-token', {
      id: 9,
      username: 'Test User',
      personalId: '1234567890',
      authorityLevel: 1,
      isActive: true,
    });

    expect(store.isAuthenticated).toBe(true);

    store.clearAuth();

    expect(store.token).toBeNull();
    expect(store.user).toBeNull();
    expect(store.isAuthenticated).toBe(false);
    expect(store.username).toBe('');
    expect(store.personalId).toBe('');
  });
});
