import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';

import commonHandlerMiddleware from './common-handler.middleware';
import GLOBAL_CONFIG from '../config/global.config';

export default async function initMiddlewares(server) {
  server.use(commonHandlerMiddleware);

  server.use(express.static(path.resolve(__dirname, '../../assets')));

  server.use(express.static(path.resolve(__dirname, '../../public')));

  server.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: 'none' }));

  server.use(helmet.hidePoweredBy());

  server.use(bodyParser.json());

  server.use(bodyParser.urlencoded({ extended: false }));

  server.use(morgan(GLOBAL_CONFIG.MORGAN_FORMAT));
}
