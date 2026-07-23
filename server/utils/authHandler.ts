import { readBody, setResponseStatus, type H3Event } from 'h3';

export async function handleLogin(event: H3Event) {
  const body = await readBody(event);
  const { id_personal, password } = body || {};

  // Simulasi validasi login menggunakan data dummy JSON
  if (id_personal === '1234567890' && password === 'password') {
    return {
      success: true,
      responseCode: 200,
      message: 'User berhasil login',
      data: {
        access_token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE3ODQ4MjI5MDQsImV4cCI6MTc4NDgyNjUwNCwibmJmIjoxNzg0ODIyOTA0LCJqdGkiOiIyTlZTaGJmZzlIVmRSSVVtIiwic3ViIjoiOSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.82640S6FjhfMcmaSDjd3u1fhx2brkde2jqaA8g8eQyk',
        token_type: 'Bearer',
        expires_in: 3600,
      },
      meta: null,
      links: null,
    };
  }

  setResponseStatus(event, 401);
  return {
    success: false,
    responseCode: 401,
    message: 'Id Personal atau Password salah',
    data: null,
    meta: null,
    links: null,
  };
}
