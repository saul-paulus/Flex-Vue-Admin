import { describe, expect, it, vi, beforeEach } from 'vitest';

import { httpClient } from '~/infrastructure/api/httpClient';
import { useAuthStore } from '~/stores/auth';

// Use vi.hoisted to ensure the mock is available during hoisting
const { innerMockFetch } = vi.hoisted(() => ({
  innerMockFetch: vi.fn(),
}));

// Mock ofetch
vi.mock('ofetch', () => ({
  $fetch: {
    create: vi.fn(() => innerMockFetch),
  },
}));

// Mock useAuthStore
vi.mock('~/stores/auth', () => ({
  useAuthStore: vi.fn(),
}));

// Mock Nuxt globals
vi.stubGlobal('navigateTo', vi.fn());

const mockAuthStore = vi.mocked(useAuthStore);

describe('httpClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuthStore.mockReturnValue({
      token: 'mock-token',
      clearToken: vi.fn(),
    } as any);
  });

  it('should call fetch with GET method', async () => {
    innerMockFetch.mockResolvedValueOnce({ success: true });
    await httpClient.get('/test');
    expect(innerMockFetch).toHaveBeenCalledWith('/test', expect.objectContaining({ method: 'GET' }));
  });

  it('should call fetch with POST method and body', async () => {
    innerMockFetch.mockResolvedValueOnce({ success: true });
    const body = { foo: 'bar' };
    await httpClient.post('/test', body);
    expect(innerMockFetch).toHaveBeenCalledWith('/test', expect.objectContaining({ method: 'POST', body }));
  });

  it('should call fetch with PUT method and body', async () => {
    innerMockFetch.mockResolvedValueOnce({ success: true });
    const body = { foo: 'bar' };
    await httpClient.put('/test', body);
    expect(innerMockFetch).toHaveBeenCalledWith('/test', expect.objectContaining({ method: 'PUT', body }));
  });

  it('should call fetch with DELETE method', async () => {
    innerMockFetch.mockResolvedValueOnce({ success: true });
    await httpClient.delete('/test');
    expect(innerMockFetch).toHaveBeenCalledWith('/test', expect.objectContaining({ method: 'DELETE' }));
  });
});
