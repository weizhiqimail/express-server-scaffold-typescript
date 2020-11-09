import os from 'os';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import jwt, { SignOptions } from 'jsonwebtoken';
import killPort from 'kill-port';
import { addDateTime, DateTypeEnum, isObject, formatDateTime } from 'easybus';
import { StatusCodes } from 'http-status-codes';
import { AxiosError } from 'axios';
import { Response } from 'express';

import { IJwtSign } from '../modules/user/user.types';
import { ValidationError } from 'class-validator';
import { IErrorResponse } from '../types/http.types';
import logger from './logger';
import { ILayerRoute, IRouteSet } from '../types/express.types';

export function getIPAddress(): string {
  const interfaces = os.networkInterfaces();
  for (const key in interfaces) {
    const iface = interfaces[key];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1') {
        return alias.address;
      }
    }
  }
}

export function hashPassword(password: string): string {
  return crypto
    .createHash('md5')
    .update(password)
    .update(process.env.PASSWORD_SALT)
    .digest('hex');
}

export function generateJwtToken(user: any, secret: string, options?: SignOptions): IJwtSign {
  const newOptions: SignOptions = {
    algorithm: 'HS256',
    ...options,
  };
  const currentTime = new Date();
  const iat = +new Date(addDateTime(currentTime, DateTypeEnum.SECONDS, -30));
  const exp = +new Date(addDateTime(currentTime, DateTypeEnum.HOURS, 2));
  const token = jwt.sign({ user, iat, exp }, secret, newOptions);
  return { token, user, iat, exp };
}

export function verifyJwtToken(token: string, secret: string): IJwtSign | null {
  try {
    const result = jwt.verify(token, secret);
    if (result) {
      return result as IJwtSign;
    }
    return null;
  } catch (err) {
    return null;
  }
}

export async function killPort(port: number) {
  return await killPort(port);
}

export function transformToPlainObject(obj: any) {
  const result: any = {};
  if (isObject(obj)) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

export function parseValidateErrors(res: Response, errors: Array<ValidationError>): IErrorResponse {
  const errorMessage = {};
  errors.forEach((error: ValidationError) => {
    const key = error.property;
    errorMessage[key] = Object.values(error.constraints);
  });
  const { method, path, hostname, query, body } = res.req;
  return {
    method,
    path,
    hostname,
    error: errorMessage,
    status: StatusCodes.BAD_REQUEST,
    time: formatDateTime(new Date()),
    query,
    body,
  };
}

export function cutObjectExtraProperties(source: object = {}, target: object = {}) {
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      if (!source.hasOwnProperty(key)) {
        delete target[key];
      }
    }
  }
}

export async function parseAxiosError(error: AxiosError) {
  delete error.request;
  const time = formatDateTime();
  const axiosErrorDir = path.resolve(__dirname, '../../logs');
  const fileName = `${time}-axios-error.json`;
  await fs.writeFileSync(`${axiosErrorDir}/${fileName}`, JSON.stringify(error));
  logger.axios(`Record Axios Error Success. Written File ${fileName}`);
}

export function parseExpressLayerRoute(route: ILayerRoute): Array<IRouteSet> {
  const arr: Array<IRouteSet> = [];
  const path = route.path;
  const methods = route.methods;
  for (let method in methods) {
    if (methods.hasOwnProperty(method)) {
      arr.push({ path, method });
    }
  }
  return arr;
}
