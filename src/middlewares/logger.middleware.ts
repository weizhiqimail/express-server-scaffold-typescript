import path from 'path';
import winston from 'winston';
import expressWinston from 'express-winston';
import { formatDateTime } from 'easybus';

const today = formatDateTime(new Date());
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
    ],
    meta: true,
    msg: 'HTTP {{ req.method }} {{ req.url }}',
    expressFormat: true,
    colorize: false,
    ignoreRoute: () => false,
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
  }),
  errorLogger: expressWinston.errorLogger({
    transports: [
      new winston.transports.File({
        dirname: path.resolve(__dirname, '../../logs'),
        filename: errorFileName,
      }),
    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
  }),
};

export default loggerMiddleware;
