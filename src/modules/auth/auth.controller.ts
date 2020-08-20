import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { ControllerInterface } from '../../types/controller.interface';
import validationMiddleware from '../../middlewares/validation';
import authService, { AuthService } from './auth.service';
import { AuthRegisterDto, AuthLoginDto } from './auth.dto';
import { Users } from '../../orm/entity/users.entity';

export default class AuthController implements ControllerInterface {
  public path: string;
  public router = express.Router();
  private authService: AuthService;

  constructor() {
    this.path = '/auth';
    this.authService = authService();
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(AuthRegisterDto), this.register);
    this.router.post(`${this.path}/login`, validationMiddleware(AuthLoginDto), this.login);
  }

  public async register(req: Request, res: Response) {
    const body: AuthRegisterDto = req.body;
    const usersRepository = getRepository(Users);
    const user = new Users();
    user.email = body.email;
    user.password = body.password;
    const result = await usersRepository.save(user);
    return res.json(result);
  }

  public async login(req: Request, res: Response) {
    const body: AuthLoginDto = req.body;
    return res.json(body);
  }
}
