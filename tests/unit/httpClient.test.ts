import { describe, expect, it, vi, beforeEach } from 'vitest';

// Import AFTER mocking
import { createHttpClient } from '~/infrastructure/api/httpClient';
import type { TokenProvider } from '@domain/auth/TokenPorts';

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

describe('httpClient', () => {
  let httpClient: ReturnType<typeof createHttpClient>;
  let mockTokenProvider: TokenProvider;

  beforeEach(() => {
    vi.clearAllMocks();
    mockTokenProvider = {
      getToken: vi.fn(() => 'mock-token'),
    };
    httpClient = createHttpClient(mockTokenProvider, { baseURL: '/api' });
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

  it('should call fetch with PATCH method and body', async () => {
    innerMockFetch.mockResolvedValueOnce({ success: true });
    const body = { foo: 'bar' };
    await httpClient.patch('/test', body);
    expect(innerMockFetch).toHaveBeenCalledWith('/test', expect.objectContaining({ method: 'PATCH', body }));
  });

  it('should call fetch with DELETE method', async () => {
    innerMockFetch.mockResolvedValueOnce({ success: true });
    await httpClient.delete('/test');
    expect(innerMockFetch).toHaveBeenCalledWith('/test', expect.objectContaining({ method: 'DELETE' }));
  });
});
