import express, { Request, Response } from 'express';

import { ControllerInterface } from '../../types/controller.interface';
import usersService, { UsersService } from './users.service';

export default class UsersController implements ControllerInterface {
  public path: string;
  public router = express.Router();
  private usersService: UsersService;

  constructor() {
    this.path = '/entity';
    this.usersService = usersService();
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(`${this.path}/create`, this.userCreate);
    this.router.get(`${this.path}/query`, this.userQuery);
    this.router.get(`${this.path}/:id/get`, this.getUserById);
  }

  private async userCreate(req: Request, res: Response) {}

  private async userQuery(req: Request, res: Response) {}

  private async getUserById(req: Request, res: Response) {}
}
