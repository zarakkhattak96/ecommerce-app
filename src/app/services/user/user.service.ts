import { CreateUserDto, FetchAllUsersDto, FetchUserDto } from '@app/dto/user/user.dto';
import { UserBaseRepoInterface } from '@domain/interfaces/user/user.interface';
import { AlreadyExists, InvalidData, NotFoundError } from '@app/app.errors';
import { v4 as uuidv4 } from '@napi-rs/uuid';
import {  inject, injectable } from 'tsyringe';
import { PasswordHashingBcrypt } from '@infra/password-hashing';

@injectable()
export class UserServiceClass {
  constructor(
    @inject("UserBaseRepoInterface") private readonly userBaseRepo: UserBaseRepoInterface,
    @inject("PasswordHashingBcrypt") private readonly passHashServ: PasswordHashingBcrypt,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const { createData } = userDto;

    const userPassword = createData.password;
    const confirmPassword = createData.confirmPassword;

    let hashedUserPassword = '';
    let hashedConfirmPassword = '';

    if (userPassword !== confirmPassword) {
      throw new InvalidData('Passwords should be similar');
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
      throw new AlreadyExists('A user with this email already exists');

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
    });

    return {
      user: createUser,
    };
  }

  async fetchAllUsers(usersDto: FetchAllUsersDto){

    const allUsers =  await this.userBaseRepo.fetchAllUsers();

    if(!allUsers) throw new NotFoundError("No users data exists in the database");

    return allUsers;
  }

  async fetchUser(userDto: FetchUserDto){
    const {userId} = userDto

    const fetchUser = await this.userBaseRepo.fetchById(userId);

    if(!fetchUser) throw new NotFoundError(`No user found with id: ${userId}`)

    return fetchUser;


  }
}
