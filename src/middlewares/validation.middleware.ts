import { NextFunction, Request, RequestHandler, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export default function validationMiddleware<T>(type: any, skipMissingProperties = false): RequestHandler {
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
        const errorMessage = {};
        errors.forEach((error: ValidationError) => {
          const key = error.property;
          errorMessage[key] = Object.values(error.constraints);
        });
        return res.status(400).json({ error: errorMessage });
      } else {
        next();
      }
    });
  };
}
