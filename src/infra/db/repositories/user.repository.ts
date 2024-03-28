import { EntityManager, Repository } from "typeorm";
import { UserModel } from "../models/user/user.model";
import {
  UserBaseRepoInterface,
  UserInterface,
} from "@domain/interfaces/user/user.interface";
import { AlreadyExists, NotFoundError } from "@app/app.errors";
import { injectable } from "tsyringe";
import ds from "@infra/config/connection.config";

@injectable()
export class UserRepositoryClass implements UserBaseRepoInterface {
  private userRepo: Repository<UserModel>;

  constructor() {
    this.userRepo = new Repository(UserModel, new EntityManager(ds));
  }

  async createUser(userInterface: UserInterface) {
    const createUser = this.userRepo.create(userInterface);

    return await this.userRepo.save(createUser, { reload: true });
  }

  async fetchAllUsers() {
    const fetchAllUsers = await this.userRepo.find({
      relations: ["purchases"],
    });

    // const filteredUsers = fetchAllUsers.forEach(user=> {
    //   const filteredProducts = user.product
    // })

    if (!fetchAllUsers)
      throw new NotFoundError("No users found in the database");

    return fetchAllUsers;
  }

  async fetchByEmail(email: string) {
    const fetchUserByEmail = await this.userRepo.findOne({
      where: { email: email },
      relations: ["purchases"],
    });

    if (fetchUserByEmail) {
      throw new AlreadyExists("A user with this email already exists.");
    }
  }

  async fetchById(id: number) {
    const fetchUser = await this.userRepo.findOne({
      where: { id: id },
      relations: ["purchases"],
    });

    if (!fetchUser) throw new NotFoundError(`No user found with id: ${id}`);

    return fetchUser;
  }

  async updateUser(userId: number, userInterface: UserInterface) {
    await this.userRepo.update({ id: userId }, userInterface);

    const findUpdatedUser = await this.userRepo.findOne({
      where: { id: userId },
      relations: ["purchases"],
    });

    if (!findUpdatedUser)
      throw new NotFoundError(`No user updated with id: ${userId}`);

    return findUpdatedUser;
  }

  async deleteUser(userId: number) {
    const userFound = await this.userRepo.findOne({ where: { id: userId } });

    if (!userFound) throw new NotFoundError(`No user found with id: ${userId}`);

    return await this.userRepo.remove(userFound);
  }
}
