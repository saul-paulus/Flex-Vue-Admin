import { AuthService } from '~/infrastructure/api/AuthService';

export default defineNuxtPlugin(() => {
  const authRepository = new AuthService();

  return {
    provide: {
      authRepository,
    },
  };
});
