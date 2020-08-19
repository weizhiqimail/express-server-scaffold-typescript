import { NextFunction, Request, Response } from 'express';

export default function errorHandle(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    return next(error);
  }
  res.redirect('/error');
}
