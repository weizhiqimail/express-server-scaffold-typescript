import url from 'url';
import { NextFunction, Request, Response } from 'express';

import { LOGIN_WHITE_LIST } from '../config/auth.config';
import { ASSETS_PATH, AUTH_REGISTER, AUTH_LOGIN } from '../../dist/src/config/url-white-list';

export default function authMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    const { pathname } = url.parse(req.url);
    if (pathname.startsWith(ASSETS_PATH)) {
      return next();
    }
    if (req.session.user) {
      if (pathname === AUTH_LOGIN || pathname === AUTH_REGISTER) {
        res.redirect('/');
      } else {
        next();
      }
    } else {
      const matchRoute = LOGIN_WHITE_LIST.some(whiteUrl => whiteUrl.test(pathname));
      if (matchRoute) {
        next();
      } else {
        res.redirect(AUTH_LOGIN);
      }
    }
  };
}
