import { App } from './app';
import { API_CONFIG } from './config';

import ViewsController from './modules/views/views.controller';
import UsersController from './modules/users/users.controller';
import AuthController from './modules/auth/auth.controller';

async function bootstrap() {
  const app = new App([
    new ViewsController({ path: '/' }),
    new UsersController({ path: `/${API_CONFIG.version}/users` }),
    new AuthController({ path: `/${API_CONFIG.version}/auth` }),
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
