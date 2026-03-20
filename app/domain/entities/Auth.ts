export interface LoginPayload {
  id_personal: string;
  password: string;
}

export interface AuthUser {
  id_personal: string;
  name: string;
  role?: number;
  [key: string]: unknown;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}
