import path from 'path';
import winston from 'winston';
import expressWinston from 'express-winston';
import { formatTime } from '../helper/common';

const today = formatTime(new Date(), false);

const normalFileName = `${today}-normal.log`;
const errorFileName = `${today}-error.log`;

const loggerMiddleware = {
  normalLogger: expressWinston.logger({
    transports: [
      new winston.transports.File({
        level: 'info',
        dirname: path.resolve(__dirname, '../../logs'),
        handleExceptions: true,
        maxsize: 5242880,
        maxFiles: 100,
        filename: normalFileName,
      }),
      // new winston.transports.Console({
      //   level: 'debug',
      //   handleExceptions: true,
      // }),
    ],
    meta: true,
    msg: 'HTTP {{ req.method }} {{ req.url }}',
    expressFormat: true,
    colorize: false,
    ignoreRoute: () => false,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
    ),
  }),
  errorLogger: expressWinston.errorLogger({
    transports: [
      new winston.transports.File({
        dirname: path.resolve(__dirname, '../../logs'),
        filename: errorFileName,
      }),
      // new winston.transports.Console(),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
    ),
  }),
};

export default loggerMiddleware;
