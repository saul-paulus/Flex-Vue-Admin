import type { AuthUser } from '~/domain/entities/Auth';

const USER_DATA_KEY = 'user_data';
const USER_TOKEN_KEY = 'user_token';

function isClient(): boolean {
  return import.meta.client && typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function getUserData(): AuthUser | null {
  if (!isClient()) return null;
  const userData = window.localStorage.getItem(USER_DATA_KEY);
  return userData ? (JSON.parse(userData) as AuthUser) : null;
}

function getUserToken(): string | null {
  if (!isClient()) return null;
  return window.localStorage.getItem(USER_TOKEN_KEY);
}

function setUserData(data: AuthUser): void {
  if (!isClient()) return;
  window.localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
}

function setUserToken(token: string | null): void {
  if (!isClient()) return;
  window.localStorage.setItem(USER_TOKEN_KEY, token || '');
}

function clearUserData(): void {
  if (!isClient()) return;
  window.localStorage.removeItem(USER_DATA_KEY);
}
function clearUserToken(): void {
  if (!isClient()) return;
  window.localStorage.removeItem(USER_TOKEN_KEY);
}

export const userTokenStorage = {
  getToken(): string | null {
    return getUserToken();
  },
  setToken(value: string | null | undefined) {
    setUserToken(value ?? null);
  },
  clear() {
    clearUserToken();
  },
};

export const userDataStorage = {
  getData(): AuthUser | null {
    return getUserData();
  },
  setData(value: AuthUser | null) {
    setUserData(value as AuthUser);
  },
  clear() {
    clearUserData();
  },
};
