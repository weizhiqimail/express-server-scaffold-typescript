import express, { Request, Response } from 'express';

import { ControllerInterface } from '../../types/controller.interface';
import validationMiddleware from '../../middlewares/validation.middleware';
import authService from './auth.service';
import usersOrmService from '../../orm/users.orm.service';
import { AuthLoginDto, AuthRegisterDto, AuthValidateJwtTokenDto } from './auth.dto';
import { Users } from '../../orm/entity/users.entity';
import { normalResponse, errorResponse } from '../../helper/unifyResponse';
import { generateJwtToken, verifyJwtToken, hashPassword, transformToPlainObject } from '../../helper/utils';
import { AUTH_RESPONSE_CODE, ILoginResultData } from './auth.types';
import { INormalResponse } from '../../types/common.interface';
import { PREFIX_V1 } from '../../config/controller.config';
import { MODULE_NAME } from './auth.config';

export default class AuthController implements ControllerInterface {
  public path: string;

  public router = express.Router();

  constructor() {
    this.path = `/${PREFIX_V1}/${MODULE_NAME}`;
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(AuthRegisterDto), this.register);
    this.router.post(`${this.path}/login`, validationMiddleware(AuthLoginDto), this.login);
    this.router.post(`${this.path}/validate-jwt`, validationMiddleware(AuthValidateJwtTokenDto), this.validateJwtToken);
  }

  public async register(req: Request, res: Response) {
    const body: AuthRegisterDto = req.body;
    const checkUser = await usersOrmService.findByEmailOrm(body.email);
    if (checkUser) {
      return errorResponse(res, AUTH_RESPONSE_CODE.EMAIL_EXIST[1]);
    }
    const user = new Users();
    user.email = body.email;
    user.password = hashPassword(body.password);
    const result = await usersOrmService.createUserOrm(user);
    return normalResponse(res, { data: result });
  }

  public async login(req: Request, res: Response) {
    const body: AuthLoginDto = req.body;

    let user = await usersOrmService.findByEmailOrm(body.email);

    if (!user) {
      return errorResponse(res, AUTH_RESPONSE_CODE.USERNAME_PASSWORD_WRONG[1]);
    }
    if (!authService.comparePassword(user.password, body.password)) {
      return errorResponse(res, AUTH_RESPONSE_CODE.USERNAME_PASSWORD_WRONG[1]);
    }

    delete user.password;
    user = transformToPlainObject(user);

    const data = generateJwtToken(user, process.env.JWT_SECRET) as ILoginResultData;
    data.id = user.id;
    data.email = user.email;

    const response: INormalResponse = { data };
    normalResponse(res, response);
  }

  public async validateJwtToken(req: Request, res: Response) {
    // @ts-ignore
    const query: AuthValidateJwtTokenDto = req.query;

    const needUser = !!query.needUser;
    const token = req.headers['authorization'];
    const jwt = verifyJwtToken(token, process.env.JWT_SECRET);

    let response: INormalResponse = { data: false };
    if (jwt) {
      response.data = { status: true };
      if (needUser) {
        response.data.user = jwt.user;
      }
      return normalResponse(res, response);
    }

    return normalResponse(res, response);
  }
}
