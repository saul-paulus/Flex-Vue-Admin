import type { AuthResponse } from '../entities/Auth';

export interface AuthRepository {
  /**
   * Melakukan proses login dengan memanggil LoginUseCase
   * @param payload - Data login yang berisi id_personal dan password
   * @returns Promise yang menyelesaikan dengan data AuthResponse jika berhasil
   */
  login(payload: { id_personal: string; password: string }): Promise<AuthResponse>;
}
