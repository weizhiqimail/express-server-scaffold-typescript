import { App } from './app';
import initEnv from './helper/initEnv';

import ViewsController from './modules/views/views.controller';
import UsersController from './modules/users/users.controller';

async function bootstrap() {
  await initEnv();

  const app = new App([
    new ViewsController({ path: '/' }),
    new UsersController({ path: '/users' }),
  ]);

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
