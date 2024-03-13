import { CreateUserDto } from "@app/dto/user/user.dto";
import { UserServiceClass } from "@app/services/user/user.service";
import { Request, Response } from "express"


export class UserController {


  constructor(private readonly userServ: UserServiceClass) { }

  createUser = async (req: Request, res: Response) => {

    const createDto = CreateUserDto.createUser(req.id, req.body);

    const createUser = await this.userServ.createUser(createDto);

    return res.status(201).send(createUser)
  }
}
