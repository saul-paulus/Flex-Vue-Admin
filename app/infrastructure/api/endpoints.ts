/**
 * Centralized Registry of API Endpoints.
 *
 * All API routes are defined here to ensure single-point maintenance
 * when API paths, versions, or query parameters change.
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/v1/auth/me',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    BASE: '/v1/users',
    DETAIL: (id: number | string) => `/v1/users/${id}`,
  },
  ROLES: {
    BASE: '/v1/roles',
    PERMISSIONS: (id: number | string) => `/v1/roles/${id}/permissions`,
  },
} as const;
