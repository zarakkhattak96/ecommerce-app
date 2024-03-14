import { Repository } from 'typeorm';
import { UserModel } from '../models/user/user.model';
import { NotFoundError } from '@app/app.errors';

export class AuthRepositoryClass {
  private userBaseRepo: Repository<UserModel>;

  constructor(repo: Repository<UserModel>) {
    this.userBaseRepo = repo;
  }

  async getByEmail(email: string): Promise<UserModel | null> {
    const user = await this.userBaseRepo.findOne({ where: { email: email } });

    if (!user)
      throw new NotFoundError("No user found with the provided email");

    return user;
  }
}
