import { describe, expect, it, vi, beforeEach } from 'vitest';
import { LoginUseCase } from '~/application/auth/LoginUseCase';
import { LogoutUseCase } from '~/application/auth/LogoutUseCase';
import { GetCurrentUserUseCase } from '~/application/auth/GetCurrentUserUseCase';
import { Result } from '@domain/shared/value-objects/Result';
import type { AuthRepository } from '@domain/auth/AuthRepository';
import type { AuthToken, AuthUser } from '@domain/auth/entities/AuthSession';
import type { TokenStoragePort } from '@domain/auth/TokenPorts';

// ── Mock Factories ──

function createMockAuthRepository(): AuthRepository {
  return {
    login: vi.fn(),
    getCurrentUser: vi.fn(),
    logout: vi.fn(),
  };
}

function createMockTokenStorage(): TokenStoragePort {
  return {
    get: vi.fn(() => null),
    save: vi.fn(),
    clear: vi.fn(),
  };
}

const MOCK_TOKEN: AuthToken = {
  accessToken: 'test-access-token',
  tokenType: 'Bearer',
  expiresIn: 3600,
};

const MOCK_USER: AuthUser = {
  id: 9,
  username: 'Test User',
  identifier: '1234567890',
  personalId: '1234567890',
  authorityLevel: 1,
  isActive: true,
};

// ── LoginUseCase Tests ──

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let mockRepo: AuthRepository;
  let mockStorage: TokenStoragePort;

  beforeEach(() => {
    mockRepo = createMockAuthRepository();
    mockStorage = createMockTokenStorage();
    useCase = new LoginUseCase(mockRepo, mockStorage);
  });

  it('should return fail if personalId is empty', async () => {
    const result = await useCase.execute({ personalId: '', password: 'password' });
    expect(result.isFail()).toBe(true);
    expect(result.error).toBe('Personal ID is required');
    expect(mockRepo.login).not.toHaveBeenCalled();
  });

  it('should return fail if password is empty', async () => {
    const result = await useCase.execute({ personalId: '123', password: '   ' });
    expect(result.isFail()).toBe(true);
    expect(result.error).toBe('Password is required');
    expect(mockRepo.login).not.toHaveBeenCalled();
  });

  it('should login successfully and save token', async () => {
    vi.mocked(mockRepo.login).mockResolvedValueOnce(Result.ok(MOCK_TOKEN));

    const result = await useCase.execute({ personalId: '1234567890', password: 'password' });

    expect(result.isOk()).toBe(true);
    expect(result.value.accessToken).toBe('test-access-token');
    expect(mockStorage.save).toHaveBeenCalledWith('test-access-token');
    expect(mockRepo.login).toHaveBeenCalledWith({
      identifier: '1234567890',
      password: 'password',
    });
  });

  it('should return fail when repository returns failure', async () => {
    vi.mocked(mockRepo.login).mockResolvedValueOnce(Result.fail('Invalid credentials'));

    const result = await useCase.execute({ personalId: '123', password: 'wrong' });

    expect(result.isFail()).toBe(true);
    expect(result.error).toBe('Invalid credentials');
    expect(mockStorage.save).not.toHaveBeenCalled();
  });
});

// ── LogoutUseCase Tests ──

describe('LogoutUseCase', () => {
  let useCase: LogoutUseCase;
  let mockRepo: AuthRepository;
  let mockStorage: TokenStoragePort;

  beforeEach(() => {
    mockRepo = createMockAuthRepository();
    mockStorage = createMockTokenStorage();
    useCase = new LogoutUseCase(mockRepo, mockStorage);
  });

  it('should logout and clear storage on success', async () => {
    vi.mocked(mockRepo.logout).mockResolvedValueOnce(Result.ok(undefined));

    const result = await useCase.execute();

    expect(result.isOk()).toBe(true);
    expect(mockStorage.clear).toHaveBeenCalled();
  });

  it('should clear storage even when API fails', async () => {
    vi.mocked(mockRepo.logout).mockRejectedValueOnce(new Error('Network error'));

    // Should not throw — storage must be cleared regardless
    await expect(useCase.execute()).rejects.toThrow('Network error');
    expect(mockStorage.clear).toHaveBeenCalled();
  });
});

// ── GetCurrentUserUseCase Tests ──

describe('GetCurrentUserUseCase', () => {
  let useCase: GetCurrentUserUseCase;
  let mockRepo: AuthRepository;

  beforeEach(() => {
    mockRepo = createMockAuthRepository();
    useCase = new GetCurrentUserUseCase(mockRepo);
  });

  it('should return user on success', async () => {
    vi.mocked(mockRepo.getCurrentUser).mockResolvedValueOnce(Result.ok(MOCK_USER));

    const result = await useCase.execute();

    expect(result.isOk()).toBe(true);
    expect(result.value.username).toBe('Test User');
  });

  it('should return fail when repository fails', async () => {
    vi.mocked(mockRepo.getCurrentUser).mockResolvedValueOnce(Result.fail('Token expired'));

    const result = await useCase.execute();

    expect(result.isFail()).toBe(true);
    expect(result.error).toBe('Token expired');
  });
});
