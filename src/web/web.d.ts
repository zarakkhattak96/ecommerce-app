import { UserModel } from '@infra/db/models/user/user.model';
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    id: string;
    _user: UserModel;
  }
}
