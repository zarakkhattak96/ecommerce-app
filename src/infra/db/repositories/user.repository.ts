import { Repository } from "typeorm";
import { UserModel } from "../models/user/user.model";
import { UserBaseRepo, UserInterface } from "@domain/interfaces/user/user.interface";
import { AlreadyExists, NotFoundError } from "@app/app.errors";



export class UserRepositoryClass implements UserBaseRepo {

  private userRepo: Repository<UserModel>;

  constructor(repo: Repository<UserModel>) {

    this.userRepo = repo;
  }

  async createUser(userInterface: UserInterface) {

    const createUser = this.userRepo.create(userInterface);


    return await this.userRepo.save(createUser, { reload: true })
  }


  async fetchAllUsers() {

    const fetchAllUsers = await this.userRepo.find();

    if (!fetchAllUsers) throw new NotFoundError("No users found in the database")

    return fetchAllUsers
  }

  async fetchByEmail(email: string) {

    const fetchUserByEmail = await this.userRepo.findOne({ where: { email: email } });

    if (!fetchUserByEmail) throw new NotFoundError("No user found with this email");

    return fetchUserByEmail;

  }

}
