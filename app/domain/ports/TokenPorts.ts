/**
 * Domain port for token provider.
 *
 * This interface defines how the infrastructure provides
 * the current authentication token to any layer that needs it,
 * WITHOUT coupling to Pinia stores or browser APIs.
 *
 * Implemented by: infrastructure/adapters/StoreTokenProvider.ts
 */
export interface TokenProvider {
  /** Get the current access token, or null if not authenticated */
  getToken(): string | null;
}

/**
 * Domain port for token persistence.
 *
 * This interface defines how tokens are stored and retrieved,
 * abstracting away the storage mechanism (cookie, localStorage, etc).
 *
 * Implemented by: infrastructure/storage/CookieTokenStorage.ts
 */
export interface TokenStoragePort {
  /** Retrieve the persisted token */
  get(): string | null;

  /** Persist a token */
  save(token: string): void;

  /** Remove the persisted token */
  clear(): void;
}
