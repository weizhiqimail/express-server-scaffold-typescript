import { NextFunction, Request, Response } from 'express';

export default function authMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    next();
  };
}
