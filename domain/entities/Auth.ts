export interface LoginPayload {
  id_personal: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id_personal: string;
    name: string;
    role?: string;
    [key: string]: any;
  };
}
