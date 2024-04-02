import {
  CreateUserDto,
  DeleteUserDto,
  FetchAllUsersDto,
  FetchUserDto,
  UpdateUserDto,
} from "@app/dto/user/user.dto";
import { UserBaseRepoInterface } from "@domain/interfaces/user/user.interface";
import {
  AlreadyExists,
  InvalidData,
  NotAuthorized,
  NotFoundError,
} from "@app/app.errors";
import { v4 as uuidv4 } from "@napi-rs/uuid";
import { inject, injectable } from "tsyringe";
import { PasswordHashingBcrypt } from "@infra/password-hashing";

@injectable()
export class UserServiceClass {
  constructor(
    @inject("UserBaseRepoInterface")
    private readonly userBaseRepo: UserBaseRepoInterface,
    @inject("PasswordHashingBcrypt")
    private readonly passHashServ: PasswordHashingBcrypt,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const { createData } = userDto;

    const userPassword = createData.password;
    const confirmPassword = createData.confirmPassword;

    let hashedUserPassword = "";
    let hashedConfirmPassword = "";

    if (userPassword !== confirmPassword) {
      throw new InvalidData("Passwords should be similar");
    }
    if (userPassword === confirmPassword) {
      if (userPassword && confirmPassword) {
        hashedUserPassword = await this.passHashServ.hash(userPassword);
        hashedConfirmPassword = await this.passHashServ.hash(confirmPassword);
      }
    }

    const userEmail = createData.email;

    let emailExists;
    if (userEmail) {
      emailExists = await this.userBaseRepo.fetchByEmail(userEmail);
    }

    if (emailExists)
      throw new AlreadyExists("A user with this email already exists");

    const createUser = await this.userBaseRepo.createUser({
      firstName: createData.firstName,
      email: userEmail,
      password: hashedUserPassword,
      confirmPassword: hashedConfirmPassword,
      city: createData.city,
      address: createData.address,
      uuid: uuidv4(),
      lastName: createData.lastName,
      productId: createData.productId,
      phoneNumber: createData.phoneNumber,
      role: createData.role,
    });

    return {
      user: createUser,
    };
  }

  async fetchAllUsers(usersDto: FetchAllUsersDto) {
    const allUsers = await this.userBaseRepo.fetchAllUsers();

    if (!allUsers)
      throw new NotFoundError("No users data exists in the database");

    return allUsers;
  }

  async fetchUser(userDto: FetchUserDto) {
    const { userId } = userDto;

    const fetchUser = await this.userBaseRepo.fetchById(userId);

    if (!fetchUser) throw new NotFoundError(`No user found with id: ${userId}`);

    return fetchUser;
  }

  async updateUser(updateDto: UpdateUserDto) {
    const { userId, updateData } = updateDto;

    const userPassword = updateData.password;
    const confirmUserPassword = updateData.confirmPassword;

    let hashedUserPassword = "";
    let hashedConfirmPassword = "";
    // let emailExists;     //TODO: To add logic to keep a check on email too, same email user can update data

    if (userPassword !== confirmUserPassword) {
      throw new InvalidData("Passwords should be similar");
    }

    //   if(userEmail){

    //   emailExists = await this.userBaseRepo.fetchByEmail(userEmail);
    // }

    if (userPassword === confirmUserPassword) {
      if (userPassword && confirmUserPassword) {
        hashedUserPassword = await this.passHashServ.hash(userPassword);

        hashedConfirmPassword =
          await this.passHashServ.hash(confirmUserPassword);

        return await this.userBaseRepo.updateUser(userId, {
          firstName: updateData.firstName,
          lastName: updateData.lastName,
          email: updateData.email,
          productId: updateData.productId,
          phoneNumber: updateData.phoneNumber,
          city: updateData.city,
          address: updateData.city,
          password: hashedUserPassword,
          confirmPassword: hashedConfirmPassword,
          role: updateData.role,
        });
      }
    }

    throw new NotAuthorized("You can only edit your data");
  }

  async deleteUser(deleteDto: DeleteUserDto) {
    const { userId } = deleteDto;

    return await this.userBaseRepo.deleteUser(userId);
  }
}
