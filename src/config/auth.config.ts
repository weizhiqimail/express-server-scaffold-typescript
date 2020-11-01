import { AUTH_WHITE_LIST } from '../modules/auth/auth.config';
import { USERS_WHITE_LIST } from '../modules/users/users.config';

export const LOGIN_WHITE_LIST = [...AUTH_WHITE_LIST, ...USERS_WHITE_LIST];
