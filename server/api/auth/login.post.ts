import { defineEventHandler } from 'h3';
import { handleLogin } from '../../utils/authHandler';

export default defineEventHandler((event) => {
  return handleLogin(event);
});
