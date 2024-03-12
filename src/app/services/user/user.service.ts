import { CreateUserDto } from "@app/dto/user/user.dto";
import { UserBaseRepo } from "@domain/interfaces/user/user.interface";


export class UserServiceClass {

  constructor(private readonly userBaseRepo: UserBaseRepo) { }


  async createUser(userDto: CreateUserDto) {

    await this.userBaseRepo.create(userDto.createData);

    const fetchAllUsers = await this.userBaseRepo.fetchAllUsers();

    return fetchAllUsers;
  }
}
