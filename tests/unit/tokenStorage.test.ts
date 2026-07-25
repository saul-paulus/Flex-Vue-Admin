import { describe, expect, it, beforeEach } from 'vitest';
import { cookieTokenStorage } from '~/infrastructure/storage/tokenStorage';

describe('cookieTokenStorage', () => {
  beforeEach(() => {
    // Clear cookies before each test
    document.cookie.split(';').forEach((c) => {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
  });

  it('should save and get token correctly', () => {
    const testToken = 'test-token-123';
    cookieTokenStorage.save(testToken);
    expect(cookieTokenStorage.get()).toBe(testToken);
  });

  it('should return null if no token is set', () => {
    expect(cookieTokenStorage.get()).toBeNull();
  });

  it('should clear token correctly', () => {
    cookieTokenStorage.save('to-be-cleared');
    cookieTokenStorage.clear();
    expect(cookieTokenStorage.get()).toBeNull();
  });

  it('should implement TokenStoragePort interface', () => {
    // Verify the interface shape
    expect(typeof cookieTokenStorage.get).toBe('function');
    expect(typeof cookieTokenStorage.save).toBe('function');
    expect(typeof cookieTokenStorage.clear).toBe('function');
  });
});
