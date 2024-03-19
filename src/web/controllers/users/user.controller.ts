import { CreateUserDto } from '@app/dto/user/user.dto';
import { AuthService, AuthResponseType } from '@app/services/auth/auth.service';
import { UserServiceClass } from '@app/services/user/user.service';
import { Request, Response } from 'express';
import { LoginDto } from '@app/dto/auth/auth.dto';
import authConfig from '@infra/config/auth.config';
import { autoInjectable, inject } from 'tsyringe';

@autoInjectable()
export class UserController {
  constructor(
    @inject("UserServiceClass") private readonly userServ: UserServiceClass,
    @inject("AuthService") private readonly authServ: AuthService,
  ) {}

  createUser = async (req: Request, res: Response) => {
    const createDto = CreateUserDto.createUser(req.id, req.body);

    const createUser = await this.userServ.createUser(createDto);

    return res.status(201).send(createUser);
  };

  login = async (req: Request, res: Response) => {
    const dto = LoginDto.create(req.body, req._user);

    // console.log(req, 'REQUEST');

    const resp = await this.authServ.login(dto);

    const resps = resp as AuthResponseType;

    if (resps) {
      if (resps.redirectUrl) {
        res.status(307).send(resp); // temporary redirect
      }
    }
    console.log(resps, 'RESPS');
    const { authToken, message, status } = resps;

    console.log(authToken, 'AUTH TOKEN FROM CONTROLLER');

    if (authToken) {
      res.cookie('token', authToken, {
        httpOnly: true,
        maxAge: authConfig.JWT_EXPIRATION_SECONDS,
        secure: true,
        sameSite: 'none',
        path: '/login',
        domain: req.hostname,
      });
    }

    console.log(req.cookies, 'COOKIES');

    return res.status(200).send({ message, status });
  };
}
