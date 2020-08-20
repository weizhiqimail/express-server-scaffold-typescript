import express, { Request, Response } from 'express';

import { ControllerInterface } from '../../types/controller.interface';
import authService, { AuthService } from './auth.service';

export default class AuthController implements ControllerInterface {
  public path: string;

  public router = express.Router();

  private authService: AuthService;

  constructor({ path }) {
    this.path = path;

    this.authService = authService();

    this.initRoutes();
  }

  public initRoutes() {}

  private async register(req: Request, res: Response) {

  }

  private async login(req: Request, res: Response) {

  }


}
