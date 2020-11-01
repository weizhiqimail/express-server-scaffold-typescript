import { NextFunction, Request, Response } from 'express';

export default function commonHandlerMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!res.$scaffold) {
    res.$scaffold = {};
  }
  res.$scaffold.url = req.url;
  next();
}
