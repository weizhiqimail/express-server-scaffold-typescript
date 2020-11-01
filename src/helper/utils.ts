import os from 'os';
import crypto from 'crypto';
import jwt, { SignOptions } from 'jsonwebtoken';
import killPort from 'kill-port';
import { addDateTime, DateTypeEnum, isObject } from 'easybus';
import { IJwtSign } from '../modules/auth/auth.types';

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
