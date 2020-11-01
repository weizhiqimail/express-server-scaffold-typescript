import express, { Application } from 'express';
import { parseToNumber } from 'easybus';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

import { ControllerInterface } from './types/controller.interface';
import { getIPAddress } from './helper/utils';
import { PORT } from './config/global.config';
import initMiddlewares from './middlewares';
import loggerMiddleware from './middlewares/logger.middleware';
import notFoundMiddleware from './middlewares/not-found.middleware';
import errorHandlerMiddleware from './middlewares/error-handler.middleware';


export class App {
  private readonly app: Application;

  private controllers: Array<ControllerInterface>;

  constructor(controllers: Array<ControllerInterface>) {
    const app = express();
    this.app = app;
    this.controllers = controllers;

    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
      ],
      tracesSampleRate: 1.0,
    });
  }

  public async start() {
    await this.initApp(this.app);

    this.app.listen(parseToNumber(process.env.PORT || PORT), () => {
      console.log(`server is running at http://localhost:${PORT}`);
      console.log(`server is running at http://${getIPAddress()}:${PORT}`);
    });
  }

  public async initApp(app) {
    await initMiddlewares(app);

    app.use(Sentry.Handlers.requestHandler());

    app.use(Sentry.Handlers.tracingHandler());

    app.use(loggerMiddleware.normalLogger);

    await this.initControllers();

    app.use(loggerMiddleware.errorLogger);

    app.use(notFoundMiddleware);

    app.use(errorHandlerMiddleware);

    app.use(Sentry.Handlers.errorHandler());
  }

  public async initControllers() {
    await this.controllers.forEach(controller => this.app.use('/', controller.router));
  }
}
