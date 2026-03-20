import type { D } from 'vue-router/dist/router-CWoNjPRp.mjs';

export interface LoginPayload {
  id_personal: string;
  password: string;
}

export interface AuthUser {
  username: string;
  id_personal: string;
  codeuker: string;
  id_role: number;
}

export interface AuthDataResponse {
  user: AuthUser;
  token_type: string;
  access_token: string;
  expires_in: number;
}

export interface AuthResponse {
  data: AuthDataResponse;
  message: string;
  responseCode: number;
}
