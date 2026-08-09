import type { TokenStoragePort } from '~/domain/ports/TokenPorts';

const COOKIE_NAME = 'auth_token';

/**
 * Cookie-based token storage implementation.
 *
 * Implements TokenStoragePort from the domain layer.
 * Stores auth tokens in cookies with security flags.
 *
 * Security measures:
 * - SameSite=Strict: Prevents CSRF attacks
 * - Secure flag: Only sent over HTTPS (production)
 * - Path scoped to /
 *
 * Note: HttpOnly cannot be set from JavaScript — for maximum security,
 * tokens should be set as HttpOnly cookies by the server (Nitro backend).
 * This client-side storage is a pragmatic compromise for SPA architecture.
 */

function isSecureContext(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.protocol === 'https:';
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const encodedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = document.cookie.match(new RegExp('(?:^|; )' + encodedName + '=([^;]*)'));
  const val = match ? decodeURIComponent(match[1] ?? '') : null;
  return val === '' ? null : val;
}

function setCookie(name: string, value: string | null, days = 7): void {
  if (typeof document === 'undefined') return;

  if (value === null) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Strict`;
    return;
  }

  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const parts = [`${name}=${encodeURIComponent(value)}`, `expires=${expires}`, 'path=/', 'SameSite=Strict'];

  // Add Secure flag when on HTTPS
  if (isSecureContext()) {
    parts.push('Secure');
  }

  document.cookie = parts.join('; ');
}

/**
 * CookieTokenStorage — Implements TokenStoragePort.
 *
 * Use this as the concrete implementation for token persistence.
 * Injected via the Nuxt plugin DI system.
 */
export const cookieTokenStorage: TokenStoragePort = {
  get(): string | null {
    return getCookie(COOKIE_NAME);
  },

  save(token: string): void {
    setCookie(COOKIE_NAME, token);
  },

  clear(): void {
    setCookie(COOKIE_NAME, null);
  },
};
