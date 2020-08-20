import express, { Request, Response } from 'express';

import { ControllerInterface } from '../../types/controller.interface';

import viewsService, { ViewsService } from './views.service';
import pkg from '../../../package.json';

export default class ViewsController implements ControllerInterface {
  public path: string;
  public router = express.Router();
  private viewsService: ViewsService;

  constructor() {
    this.path = '/';
    this.viewsService = viewsService();
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(this.path, this.renderIndexPage);
  }

  private renderIndexPage(req: Request, res: Response) {
    return res.render('index', { title: pkg.name });
  }
}
