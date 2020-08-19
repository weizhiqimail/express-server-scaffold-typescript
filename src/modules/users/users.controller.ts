import express from 'express';

import { ControllerInterface } from '../../interfaces/controller.interface';
import usersService, { UsersService } from './users.service';

export default class UsersController implements ControllerInterface {
  public path: string;

  public router = express.Router();

  private usersService: UsersService;

  constructor({ path }) {
    this.path = path;

    this.usersService = usersService();

    this.initRoutes();
  }

  public initRoutes() {
  }
}
