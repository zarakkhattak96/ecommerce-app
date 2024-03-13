import { CreateUserDto } from "@app/dto/user/user.dto";
import { UserBaseRepo } from "@domain/interfaces/user/user.interface";
import { PasswordHashingService } from "../password-hashing.service";
import { AlreadyExists } from "@app/app.errors";
import { v4 as uuidv4 } from "@napi-rs/uuid"


export class UserServiceClass {

  constructor(private readonly userBaseRepo: UserBaseRepo, private readonly passHashServ: PasswordHashingService) { }


  async createUser(userDto: CreateUserDto) {

    const { createData } = userDto;

    const userPassword = createData.password;
    const confirmPassword = createData.confirmPassword;


    let hashedUserPassword: string = "";
    let hashedConfirmPassword: string = "";
    if(userPassword === confirmPassword){ 
    
    if (userPassword && confirmPassword) {
      hashedUserPassword = await this.passHashServ.hash(userPassword);
      hashedConfirmPassword = await this.passHashServ.hash(confirmPassword)

      
    }
    }

    const userEmail = createData.email;

    let emailExists;
    if (userEmail) {
      emailExists = await this.userBaseRepo.fetchByEmail(userEmail);

    }

    if (emailExists) throw new AlreadyExists("A user with this email already exists")


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

    })
    
    return {

      user: createUser
    }


  }
}
