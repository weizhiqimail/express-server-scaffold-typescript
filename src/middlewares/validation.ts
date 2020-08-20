import { Request, Response, NextFunction, RequestHandler } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { parseValidationError } from '../helper/common';

export default function validation<T>(type: any, skipMissingProperties = false): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    let method = req.method.toUpperCase();
    let validateParams;

    if (method === 'GET') {
      validateParams = req.query;
    } else {
      validateParams = req.body;
    }

    validate(plainToClass(type, validateParams), {
      skipMissingProperties,
    }).then((errors: Array<ValidationError>) => {
      if (errors.length > 0) {
        const messages = errors.map((error: ValidationError) => parseValidationError(error));
        return res.status(400).json({ messages });
      } else {
        next();
      }
    });
  };
}
