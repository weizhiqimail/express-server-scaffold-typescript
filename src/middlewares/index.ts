import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import helmet from 'helmet';
import nunjucks from 'nunjucks';
import morgan from 'morgan';
import redis from 'redis';
import connectRedis from 'connect-redis';
import flash from 'connect-flash';

import errorHandle from './errorHandle';
import { MORGAN_LOG_FORMAT } from '../config';
import pkg from '../../package.json';

export default async function initMiddlewares(server) {
  const redisClient = redis.createClient(parseInt(process.env.REDIS_PORT, 10), process.env.REDIS_HOST);
  const RedisStore = connectRedis(session);
  server.use(
    session({
      name: pkg.name,
      secret: process.env.SESSION_SECRET,
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60 * 1000 * 60 * 24,
        httpOnly: true,
      },
    }),
  );

  server.use(flash());
  server.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
  });
  server.locals.scaffold = {
    title: pkg.name,
    description: pkg.description,
  };

  server.use(errorHandle);
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
