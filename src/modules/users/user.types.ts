import { StatusCodes } from 'http-status-codes';

import { IResponseCodeItem } from '../../types/common.interface';

interface IUserResponseCode {
  USERNAME_EXIST: IResponseCodeItem;
  EMAIL_EXIST: IResponseCodeItem;
  USERNAME_NOT_EXIST: IResponseCodeItem;
  USERNAME_PASSWORD_WRONG: IResponseCodeItem;
}

const BAD_REQUEST = StatusCodes.BAD_REQUEST;

export const USER_RESPONSE_CODE: IUserResponseCode = {
  USERNAME_EXIST: ['USERNAME_EXIST', '用户名已被使用', BAD_REQUEST],
  EMAIL_EXIST: ['EMAIL_EXIST', '用户邮箱已被使用', BAD_REQUEST],
  USERNAME_NOT_EXIST: ['USERNAME_NOT_EXIST', '用户不存在', BAD_REQUEST],
  USERNAME_PASSWORD_WRONG: ['USERNAME_PASSWORD_WRONG', '用户名或密码错误', BAD_REQUEST],
};
