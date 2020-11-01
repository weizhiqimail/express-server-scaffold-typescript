import { Request, Response } from 'express';
import { formatDateTime } from 'easybus';

import { IErrorResponse } from '../types/common.interface';
import { GLOBAL_RESPONSE_CODE } from '../config/response-code.config';

export default function notFoundMiddleware(req: Request, res: Response) {
  const response: IErrorResponse = {
    method: req.method,
    url: req.url,
    status: GLOBAL_RESPONSE_CODE.NOT_FOUND[2],
    error: GLOBAL_RESPONSE_CODE.NOT_FOUND[1],
    time: formatDateTime(),
  };
  res.status(response.status).json(response);
}
