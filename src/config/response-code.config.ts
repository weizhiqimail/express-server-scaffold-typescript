import { getReasonPhrase, StatusCodes } from 'http-status-codes';

import { IResponseCodeItem } from '../types/common.interface';

interface IGlobalResponseCode {
  SERVER_ERROR: IResponseCodeItem;
  NOT_FOUND: IResponseCodeItem;
  REDIS_ERROR: IResponseCodeItem;
}

const { INTERNAL_SERVER_ERROR, NOT_FOUND } = StatusCodes;

export const GLOBAL_RESPONSE_CODE: IGlobalResponseCode = {
  SERVER_ERROR: [getReasonPhrase(INTERNAL_SERVER_ERROR), '服务出错', INTERNAL_SERVER_ERROR],
  NOT_FOUND: [getReasonPhrase(NOT_FOUND), '资源不存在', NOT_FOUND],
  REDIS_ERROR: ['REDIS_ERROR', 'redis 错误'],
};
