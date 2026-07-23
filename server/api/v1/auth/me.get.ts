import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  return {
    success: true,
    responseCode: 200,
    message: 'User berhasil diambil',
    data: {
      id: 9,
      username: 'Test User',
      id_personal: '1234567890',
      verify_idpersonal: '2026-07-10 01:20:13',
      password_show: 'password',
      codeuker: '6617',
      id_wewenang: 1,
      is_active: 1,
      created_at: '2026-07-10T01:20:13.000000Z',
      updated_at: '2026-07-10T01:20:13.000000Z',
    },
    meta: null,
    links: null,
  };
});
