import { describe, expect, it, beforeEach } from 'vitest';
import { tokenStorage } from '~/infrastructure/storage/tokenStorage';

describe('tokenStorage', () => {
  beforeEach(() => {
    // Clear cookies before each test
    document.cookie.split(';').forEach((c) => {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
  });

  it('should set and get token correctly', () => {
    const testToken = 'test-token-123';
    tokenStorage.token = testToken;
    expect(tokenStorage.token).toBe(testToken);
  });

  it('should return null if no token is set', () => {
    expect(tokenStorage.token).toBeNull();
  });

  it('should clear token correctly', () => {
    tokenStorage.token = 'to-be-cleared';
    tokenStorage.clear();
    expect(tokenStorage.token).toBeNull();
  });

  it('should handle undefined/null when setting token', () => {
    tokenStorage.token = 'initial';
    tokenStorage.token = undefined;
    expect(tokenStorage.token).toBeNull();

    tokenStorage.token = 'initial-2';
    tokenStorage.token = null;
    expect(tokenStorage.token).toBeNull();
  });
});
