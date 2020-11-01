import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';

import authMiddleware from './auth.middleware';
import mountResToReqMiddleware from './mount-res-to-req.middleware';
import { MORGAN_LOG_FORMAT } from '../config/logger.config';

export default async function initMiddlewares(server) {
  server.use(authMiddleware());

  server.use(express.static(path.resolve(__dirname, '../../assets')));

  server.use(express.static(path.resolve(__dirname, '../../public')));

  server.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: 'none' }));

  server.use(helmet.hidePoweredBy());

  server.use(bodyParser.json());

  server.use(bodyParser.urlencoded({ extended: false }));

  server.use(mountResToReqMiddleware);

  server.use(morgan(MORGAN_LOG_FORMAT));
}
