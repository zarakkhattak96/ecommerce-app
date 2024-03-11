import { Response } from 'express';
import { JwtPayload, JwtService } from '../jwt.service';
import { AppError, NotAuthorized, NotFoundError } from '@app/app.errors';
import NodeCache from 'node-cache';
import config from '@infra/config';
import { UserModel } from '@infra/db/models/user/user.model';
import { CreateUserDto, LoginDto } from '@app/dto/auth/auth.dto';
import { AuthRepositoryClass } from '@infra/db/repositories/auth.repository';
import { PasswordHashingService } from '../password-hashing.service';

export type AuthResponseType = {
  redirectUrl?: string;
  status: string;
  email?: string;
  description?: string;
  message?: string;
  authToken?: string;
  statusCode?: Response['statusCode'];
};

export const authError = (description: string, code: 'not_authorized') => {
  new NotAuthorized(description, code);
};

const checkToken = async (
  token: string,
  jwtServ: JwtService,
): Promise<{ payload: JwtPayload; expiresAt: number }> => {
  try {
    return await jwtServ.verify(token);
  } catch (err) {
    throw authError('Invalid token. Please login again.', 'not_authorized');
  }
};

const LOGIN_ERR = new AppError('Incorrect email/password', 'fail');

export class AuthService {
  private readonly tokenToUserPromise: NodeCache;
  constructor(
    readonly authRepo: AuthRepositoryClass,
    readonly jwtServ?: JwtService,
    readonly passServ?: PasswordHashingService,
  ) {
    this.tokenToUserPromise = new NodeCache({
      maxKeys: 2000,
      stdTTL: config.authConfig.JWT_EXPIRATION_SECONDS,
      useClones: false,
      deleteOnExpire: true,
      checkperiod: 3600,
    });
  }

  async loginUser(
    authUser: UserModel,
    userId: number,
  ): Promise<AuthResponseType> {
    const authToken = await this.jwtServ?.sign({
      sub: authUser.uuid,
    });

    return {
      message: 'Successfully logged in',
      status: 'success',
      authToken,
    };
  }

  // async createUser(createUser: CreateUserDto) {}

  async login(loginDto: LoginDto) {
    const { email, password, user } = loginDto;

    const authUser = await this.authRepo.getByEmail(email);

    if (!authUser) throw new NotFoundError('User not found');

    const verifyPassword = await this.passServ?.verifyPassword(
      password,
      authUser.password,
    );

    if (authUser && verifyPassword) {
      return await this.loginUser(authUser, user.id);
    }

    // if (!authUser) {
    // }

    throw LOGIN_ERR;
  }
}
