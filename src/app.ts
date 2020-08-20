import express from 'express';

import { ControllerInterface } from './types/controller.interface';
import { getIPAddress } from './helper/common';
import initMiddlewares from './middlewares';

export class App {
  private app: express.Application;
  private controllers: Array<ControllerInterface>;

  constructor(controllers: Array<ControllerInterface>) {
    this.app = express();
    this.controllers = controllers;
  }

  public async start() {
    const PORT = parseInt(process.env.PORT || '12580');
    await this.initApp(this.app);

    this.app.listen(PORT, err => {
      if (err) {
        console.log(err);
      } else {
        let ip = getIPAddress();
        console.log(`server is running at http://localhost:${PORT}`);
        console.log(`server is running at http://${ip}:${PORT}`);
      }
    });
  }

  public async initApp(app) {
    await initMiddlewares(app);
    await this.initControllers();
  }

  public async initControllers() {
    await this.controllers.forEach(controller => this.app.use('/', controller.router));
  }
}
