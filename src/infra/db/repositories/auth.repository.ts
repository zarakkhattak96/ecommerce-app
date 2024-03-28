import { EntityManager, Repository } from "typeorm";
import { UserModel } from "../models/user/user.model";
import { NotFoundError } from "@app/app.errors";
import { injectable } from "tsyringe";
import ds from "@infra/config/connection.config";

@injectable()
export class AuthRepositoryClass {
  private userBaseRepo: Repository<UserModel>;

  constructor() {
    this.userBaseRepo = new Repository(UserModel, new EntityManager(ds));
  }

  async getByEmail(email: string): Promise<UserModel | null> {
    const user = await this.userBaseRepo.findOne({ where: { email: email } });

    if (!user) throw new NotFoundError("No user found with the provided email");

    return user;
  }
}
