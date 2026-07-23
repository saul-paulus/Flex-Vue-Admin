import { defineEventHandler } from 'h3';

export function handleLogout() {
  return {
    success: true,
    responseCode: 200,
    message: 'User berhasil logout',
    data: null,
    meta: null,
    links: null,
  };
}
