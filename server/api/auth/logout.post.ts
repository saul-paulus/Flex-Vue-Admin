import { defineEventHandler } from 'h3';
import { handleLogout } from '../../utils/logoutHandler';

export default defineEventHandler(() => {
  return handleLogout();
});
