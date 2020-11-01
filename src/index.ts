import './helper/initEnv';

import { createConnection } from 'typeorm';
import { parseToNumber } from 'easybus';
import logSymbols from 'log-symbols';


import { App } from './app';
import UsersController from './modules/users/users.controller';
import AuthController from './modules/auth/auth.controller';
import { NODE_ERROR_CODE } from './config/error-code.config';
import { killPort } from './helper/utils';
import { PORT } from './config/global.config';

async function bootstrap() {
  const port = parseToNumber(process.env.PORT || PORT);
  await killPort(port);
  console.log(logSymbols.success, `已经杀死端口 ${port}`);

  await createConnection();

  const app = new App([new UsersController(), new AuthController()]);

  await app.start();
}

bootstrap();

process.on('unhandledRejection', err => {
  console.log('unhandledRejection');
  console.log(err);
  process.exit(1);
});

process.on('uncaughtException', async err => {
  console.log('uncaughtException');
  process.exit(1);
});
