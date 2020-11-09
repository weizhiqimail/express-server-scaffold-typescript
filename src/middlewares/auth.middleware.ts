import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { errorResponse } from '../helper/unify-response';
import { RESPONSE_CODE } from '../config/response-code.config';
import { verifyJwtToken } from '../helper/utils';
import { IJwtSign } from '../modules/user/user.types';
import logger from '../helper/logger';

const { UNAUTHORIZED } = StatusCodes;

const WHITE_AUTH_LIST = ['/api/v1/USER/register', '/api/v1/USER/login', '/api/v1/USER/validate-token'];

export default function authJwtMiddleware(req: Request, res: Response, next: NextFunction) {
  const path = req.path;
  if (WHITE_AUTH_LIST.includes(path)) {
    return next();
  }
  const authorization = req.headers['authorization'];
  if (!authorization) {
    logger.error('no authorization');
    return errorResponse(res, RESPONSE_CODE.UNAUTHORIZED.phraseCn, UNAUTHORIZED);
  }
  const token: IJwtSign = verifyJwtToken(authorization, process.env.JWT_SECRET);
  if (!token) {
    logger.error('token parse failed');
    return errorResponse(res, RESPONSE_CODE.UNAUTHORIZED.phraseCn, UNAUTHORIZED);
  }

  if (!req.$server) {
    req.$server = {};
  }
  req.$server.user = token.user;
  next();
}
