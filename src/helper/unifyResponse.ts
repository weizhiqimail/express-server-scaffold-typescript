import { Response } from 'express';
import { formatDateTime, isString } from 'easybus';

import { IErrorResponse, INormalResponse } from '../types/common.interface';

export function normalResponse(res: Response, result: INormalResponse = {}, status = 200) {
  if (!result.profile) {
    result.profile = {};
  }
  if (!result.data) {
    result.data = null;
  }
  return res.status(status).json(result);
}

export function errorResponse(res: Response, errorResponse: IErrorResponse | string, status = 400) {
  let url = res.$scaffold.url;

  let result: IErrorResponse = {};
  if (isString(errorResponse)) {
    result.error = errorResponse as string;
    result.url = url;
    result.status = status;
    result.time = formatDateTime(new Date());
    return res.json(status).json(result);
  }

  if (!result.url) {
    result.url = url;
  }
  if (!result.error) {
    result.error = '请求出错';
  }
  if (!result.time) {
    result.time = formatDateTime(new Date());
  }
  if (!result.status) {
    result.status = status;
  }
  return res.json(status).json(result);
}
