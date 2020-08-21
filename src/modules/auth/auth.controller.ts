import express, { Request, Response } from 'express';

import { ControllerInterface } from '../../types/controller.interface';
import validationMiddleware from '../../middlewares/validation.middleware';
import authService from './auth.service';
import usersOrmService from '../../orm/users.orm.service';
import { AuthLoginDto, AuthRegisterDto } from './auth.dto';
import { Users } from '../../orm/entity/users.entity';
import { existResponse, loginFailResponse, unifyResponse } from '../../helper/return-data';
import { hashPassword } from '../../helper/common';

export default class AuthController implements ControllerInterface {
  public path: string;
  public router = express.Router();

  constructor() {
    this.path = '/auth';
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(AuthRegisterDto), this.register);
    this.router.post(`${this.path}/login`, validationMiddleware(AuthLoginDto), this.login);
  }

  public async register(req: Request, res: Response) {
    const body: AuthRegisterDto = req.body;
    const checkUser = await usersOrmService.findByEmailOrm(body.email);
    if (checkUser) {
      return existResponse(res, '邮箱已被使用');
    }
    const user = new Users();
    user.email = body.email;
    user.password = hashPassword(body.password);
    const result = await usersOrmService.createUserOrm(user);
    return unifyResponse(res, { data: result });
  }

  public async login(req: Request, res: Response) {
    const body: AuthLoginDto = req.body;
    const checkUser = await usersOrmService.findByEmailOrm(body.email);
    if (!checkUser) {
      return existResponse(res, '邮箱不存在');
    }
    if (!authService.comparePassword(checkUser.password, body.password)) {
      return loginFailResponse(res, '登录失败，用户名或密码错误');
    }
    req.session.user = checkUser;
    return unifyResponse(res);
  }
}
