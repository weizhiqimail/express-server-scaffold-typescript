import express from 'express';

import { ControllerInterface } from '../../interfaces/controller.interface';
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
}
