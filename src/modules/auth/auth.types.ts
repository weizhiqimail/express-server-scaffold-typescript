import { StatusCodes } from 'http-status-codes';

import { IResponseCodeItem } from '../../types/common.interface';

interface IAuthResponseCode {
  EMAIL_EXIST: IResponseCodeItem;
  USERNAME_NOT_EXIST: IResponseCodeItem;
  USERNAME_PASSWORD_WRONG: IResponseCodeItem;
}

const BAD_REQUEST = StatusCodes.BAD_REQUEST;

export const AUTH_RESPONSE_CODE: IAuthResponseCode = {
  EMAIL_EXIST: ['USERNAME_EXIST', '用户名已被使用', BAD_REQUEST],
  USERNAME_NOT_EXIST: ['USERNAME_NOT_EXIST', '用户邮箱已被使用', BAD_REQUEST],
  USERNAME_PASSWORD_WRONG: ['USERNAME_PASSWORD_WRONG', '用户名或密码错误', BAD_REQUEST],
};

export interface IJwtSign {
  token: string;
  user: object;
  iat: number;
  exp: number;
}

export interface ILoginResultData extends IJwtSign {
  id: string | number;
  email?: string;
}
