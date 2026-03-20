const COOKIE_NAME = 'auth_token';

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
    document.cookie = `${name}=; Max-Age=0; path=/`;
  } else {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }
}

export const tokenStorage = {
  get token(): string | null {
    return getCookie(COOKIE_NAME);
  },
  set token(value: string | null | undefined) {
    setCookie(COOKIE_NAME, value ?? null);
  },
  clear() {
    setCookie(COOKIE_NAME, null);
  },
};
