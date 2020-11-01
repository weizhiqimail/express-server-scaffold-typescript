import { NextFunction, Request, Response } from 'express';
import { formatDateTime } from 'easybus';

import { IErrorResponse } from '../types/common.interface';
import { GLOBAL_RESPONSE_CODE } from '../config/response-code.config';

export default function errorHandlerMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  const response: IErrorResponse = {
    url: req.url,
    status: GLOBAL_RESPONSE_CODE.SERVER_ERROR[2],
    error: GLOBAL_RESPONSE_CODE.SERVER_ERROR[1],
    time: formatDateTime(),
  };
  res.status(response.status).json(response);
}
