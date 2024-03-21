import { NotAuthorized, NotFoundError, AppError } from '@app/app.errors';
import { PasswordHashingService } from '../password-hashing.service';
import { JwtService } from '../jwt.service';
import { LoginDto } from '@app/dto/auth/auth.dto';
import { AuthRepositoryClass } from '@infra/db/repositories/auth.repository';
import { autoInjectable, injectable } from 'tsyringe';
import { PasswordHashingBcrypt } from '@infra/password-hashing';
import { JwtServiceProv } from '@infra/jwt';

export type AuthResponseType = {
  redirectUrl?: string;
  status: string;
  email?: string;
  description?: string;
  message?: string;
  authToken?: string;
  statusCode?: Response['status'];
};

const LOGIN_ERR = new AppError('Incorrect email/password', 'fail');

export const authError = (description: string, code: 'not_authorized') => {
  new NotAuthorized(description, code);
};

@autoInjectable()
export class AuthService {
  constructor(
    private readonly passServ: PasswordHashingBcrypt,
    private readonly authRepo: AuthRepositoryClass,
    private readonly jwtServ: JwtServiceProv,
  ) {}

  async login(authDto: LoginDto) {
    const { email, password } = authDto;

    const authUser = await this.authRepo.getByEmail(email);

    if (!authUser) throw new NotFoundError('User does not exist');

    const verifyPassword = await this.passServ.verifyPassword(
      password,
      authUser.password,
    );

    const authToken = await this.jwtServ?.sign({
      // secret: config.authConfig.JWT_SECRET,
      sub: authUser.uuid,
    });

    console.log(authToken, 'AUTH TOKEN');

    if (authUser && verifyPassword) {
      return {
        message: 'Successfully logged in',
        status: 'Success',
        authToken,
      };
    }

    throw LOGIN_ERR;
  }
}
// const checkToken = async (
//   token: string,
//   jwtServ: JwtService,
// ): Promise<{ payload: JwtPayload; expiresAt: number }> => {
//   try {
//     return await jwtServ.verify(token);
//   } catch (err) {
//     throw authError('Invalid token. Please login again.', 'not_authorized');
//   }
// };
