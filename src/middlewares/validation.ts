import { RequestHandler } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

import HttpException from '../exception/http.exception';

function validation<T>(
  type: any,
  skipMissingProperties = false,
): RequestHandler {
  return (req, res, next) => {
    let METHOD = req.method.toUpperCase();
    let validateParams;

    if (METHOD === 'GET') {
      validateParams = req.query;
    } else {
      validateParams = req.body;
    }

    validate(plainToClass(type, validateParams), {
      skipMissingProperties,
    }).then((errors: Array<ValidationError>) => {
      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) => Object.values(error.constraints))
          .join(', ');
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
}

export default validation;
