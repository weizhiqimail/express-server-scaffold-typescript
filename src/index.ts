import { createConnection } from 'typeorm';

import { App } from './app';
import ViewsController from './modules/views/views.controller';
import UsersController from './modules/users/users.controller';
import AuthController from './modules/auth/auth.controller';

async function bootstrap() {
  await createConnection();
  const app = new App([new ViewsController(), new UsersController(), new AuthController()]);
  await app.start();
}

bootstrap();

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

process.on('uncaughtException', err => {
  console.log(err);
  process.exit(1);
});
