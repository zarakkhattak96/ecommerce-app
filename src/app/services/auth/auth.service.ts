// import { Response } from 'express';
// import { JwtPayload, JwtService } from '../jwt.service';
// import { AppError, NotAuthorized, NotFoundError } from '@app/app.errors';
// import NodeCache from 'node-cache';
// import config from '@infra/config';
// import { UserModel } from '@infra/db/models/user/user.model';
// import { CreateUserDto, LoginDto } from '@app/dto/auth/auth.dto';
// import { AuthRepositoryClass } from '@infra/db/repositories/auth.repository';
// import { PasswordHashingService } from '../password-hashing.service';
import { NotAuthorized, NotFoundError, AppError } from "@app/app.errors";
import { PasswordHashingService } from "../password-hashing.service";
import { UserServiceClass } from "../user/user.service";
import { JwtService } from "../jwt.service";
import { UserModel } from "@infra/db/models/user/user.model";
import { LoginDto } from "@app/dto/auth/auth.dto";
import { AuthRepositoryClass } from "@infra/db/repositories/auth.repository";

export type AuthResponseType = {
  redirectUrl?: string;
  status: string;
  email?: string;
  description?: string;
  message?: string;
  authToken?: string;
  statusCode?: Response["status"];
};

const LOGIN_ERR = new AppError('Incorrect email/password', 'fail');


export const authError = (description: string, code: 'not_authorized') => {
  new NotAuthorized(description, code);
};

export class AuthService{

  constructor(private readonly passServ: PasswordHashingService, private readonly userServ: UserServiceClass,
    private readonly jwtServ: JwtService,
    private readonly authRepo: AuthRepositoryClass){}

 async loginUser(authUser: UserModel, userId: number){

   const authToken = await this.jwtServ.sign({sub: authUser.uuid});
   return {

      message: "Successfully logged in",
      status: 'Success',
      authToken
    } 
  }


  async login (authDto: LoginDto ){

    const {email, password} = authDto;
    
    const authUser = await this.authRepo.getByEmail(email);

    if(!authUser)throw new NotFoundError("User does not exist");

    const verifyPassword = await this.passServ.verifyPassword(password, authUser.password);
    
    if(authUser && verifyPassword){

     return await this.loginUser(authUser, authUser.id);
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


