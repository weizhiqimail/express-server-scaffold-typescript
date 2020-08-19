import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import nunjucks from 'nunjucks';
import morgan from 'morgan';

import errorHandle from './errorHandle';
import callbackCatch from './callbackCatch';
import { MORGAN_LOG_FORMAT } from '../config';

export default async function initMiddlewares(server) {
  server.use(errorHandle);
  server.use(callbackCatch);

  server.use(express.static(path.resolve(__dirname, '../../public')));

  server.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: 'none' }));
  server.use(helmet.hidePoweredBy());

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));

  server.set('view engine', 'njk');
  nunjucks.configure(path.resolve(__dirname, '../../views'), {
    autoescape: true,
    express: server,
    watch: true,
    noCache: true,
  });

  server.use(morgan(MORGAN_LOG_FORMAT));
}
