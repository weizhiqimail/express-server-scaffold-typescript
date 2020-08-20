import { NextFunction, Request, Response } from 'express';

export default function errorHandle(error: Error, req: Request, res: Response, next: NextFunction) {
  req.flash('error', error.message);
  res.redirect('/error');
}
