import { AUTH_WHITE_LIST } from '../modules/auth/auth.config';
import { USERS_WHITE_LIST } from '../modules/users/users.config';
import { VIEWS_WHITE_LIST } from '../modules/views/views.config';

export const AUTH_LOGIN = '/auth/login';
export const AUTH_REGISTER = '/auth/register';
export const ASSETS_PATH = '/assets';

const LOGIN_WHITE_LIST = [...AUTH_WHITE_LIST, ...USERS_WHITE_LIST, ...VIEWS_WHITE_LIST];

export default LOGIN_WHITE_LIST;