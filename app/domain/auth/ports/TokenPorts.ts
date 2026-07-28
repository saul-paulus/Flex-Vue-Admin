/**
 * Token Ports — Domain abstractions for token management.
 *
 * These interfaces define how the infrastructure provides and persists
 * authentication tokens WITHOUT coupling to Pinia stores or browser APIs.
 */

/**
 * TokenProvider — Read-only access to the current auth token.
 * Used by HttpClient to attach Authorization headers.
 */
export interface TokenProvider {
  /** Get the current access token, or null if not authenticated */
  getToken(): string | null;
}

/**
 * TokenStoragePort — Persistence for auth tokens.
 * Abstracts away the storage mechanism (cookie, localStorage, sessionStorage, etc).
 */
export interface TokenStoragePort {
  /** Retrieve the persisted token */
  get(): string | null;

  /** Persist a token */
  save(token: string): void;

  /** Remove the persisted token */
  clear(): void;
}
