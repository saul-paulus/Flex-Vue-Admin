export interface LoginPayload {
  id_personal: string;
  password: string;
}

export interface AuthUser {
  id: number;
  username: string;
  id_personal: string;
  verify_idpersonal?: string;
  password_show?: string;
  codeuker: string;
  id_wewenang: number;
  is_active: number;
  created_at?: string;
  updated_at?: string;
}

export interface AuthTokenData {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface ApiResponse<T> {
  success: boolean;
  responseCode: number;
  message: string;
  data: T;
  meta: any;
  links: any;
}

export type AuthLoginResponse = ApiResponse<AuthTokenData>;
export type AuthUserResponse = ApiResponse<AuthUser>;
