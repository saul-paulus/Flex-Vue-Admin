/**
 * Token Ports — Domain abstractions for token management.
 */

export interface TokenProvider {
  getToken(): string | null;
}

export interface TokenStoragePort {
  get(): string | null;
  save(token: string): void;
  clear(): void;
}
