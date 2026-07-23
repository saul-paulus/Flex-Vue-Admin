import type { AuthLoginResponse, AuthLogoutResponse, AuthUserResponse, LoginPayload } from '../entities/Auth';

export interface AuthRepository {
  /**
   * Melakukan proses login dengan memanggil API
   * @param payload - Data login yang berisi id_personal dan password
   * @returns Promise yang menyelesaikan dengan AuthLoginResponse jika berhasil
   */
  login(payload: LoginPayload): Promise<AuthLoginResponse>;

  /**
   * Mengambil data user yang sedang login
   * @returns Promise yang menyelesaikan dengan AuthUserResponse
   */
  getUserMe(): Promise<AuthUserResponse>;

  /**
   * Melakukan proses logout
   * @returns Promise yang menyelesaikan dengan AuthLogoutResponse
   */
  logout(): Promise<AuthLogoutResponse>;
}
