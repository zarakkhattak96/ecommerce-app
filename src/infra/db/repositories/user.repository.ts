import { EntityManager, Repository } from 'typeorm';
import { UserModel } from '../models/user/user.model';
import {
  UserBaseRepoInterface,
  UserInterface,
} from '@domain/interfaces/user/user.interface';
import { AlreadyExists, NotFoundError } from '@app/app.errors';
import { injectable } from 'tsyringe';
import ds from '@infra/config/connection.config';

@injectable()
export class UserRepositoryClass implements UserBaseRepoInterface {
  private userRepo: Repository<UserModel>;

  constructor() {
    this.userRepo = new Repository(UserModel, new EntityManager(ds));
  }

  async createUser(userInterface: UserInterface) {
    console.log(this.userRepo, 'USER REPo');
    const createUser = this.userRepo.create(userInterface);

    return await this.userRepo.save(createUser, { reload: true });
  }

  async fetchAllUsers() {
    const fetchAllUsers = await this.userRepo.find({ relations: ['product'] });

    if (!fetchAllUsers)
      throw new NotFoundError('No users found in the database');

    return fetchAllUsers;
  }

  async fetchByEmail(email: string) {
    const fetchUserByEmail = await this.userRepo.findOne({
      where: { email: email },
      relations: ['product'],
    });

    if (fetchUserByEmail) {
      throw new AlreadyExists('A user with this email already exists.');
    }
  }
}
