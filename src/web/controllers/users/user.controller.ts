import {
  CreateUserDto,
  DeleteUserDto,
  FetchAllUsersDto,
  FetchUserDto,
  UpdateUserDto,
} from "@app/dto/user/user.dto";
import { AuthService, AuthResponseType } from "@app/services/auth/auth.service";
import { UserServiceClass } from "@app/services/user/user.service";
import { Request, Response } from "express";
import { LoginDto } from "@app/dto/auth/auth.dto";
import authConfig from "@infra/config/auth.config";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserController {
  constructor(
    @inject("UserServiceClass") private readonly userServ: UserServiceClass,
    @inject("AuthService") private readonly authServ: AuthService,
  ) {}

  createUser = async (req: Request, res: Response) => {
    const createDto = CreateUserDto.createUser(req.id, req.body);

    const createUser = await this.userServ.createUser(createDto);

    return res
      .status(201)

      .json({
        status: 201,
        code: "user_created",
        createUser,
        message: "User has been successfully created",
      });
  };

  login = async (req: Request, res: Response) => {
    const dto = LoginDto.create(req.body, req._user);

    const resp = await this.authServ.login(dto);

    const resps = resp as AuthResponseType;

    if (resps) {
      if (resps.redirectUrl) {
        res.status(307).send(resp); // temporary redirect
      }
    }
    const { authToken, message, status } = resps;

    if (authToken) {
      res.cookie("token", authToken, {
        httpOnly: true,
        maxAge: authConfig.JWT_EXPIRATION_SECONDS,
        secure: true,
        sameSite: "none",
        path: "/login",
        domain: req.hostname,
      });
    }

    return res.status(200).send({ message, status });
  };

  fetchAllUsers = async (req: Request, res: Response) => {
    const fetchAllDto = FetchAllUsersDto.fetchAll(req.id);
    const allUsers = await this.userServ.fetchAllUsers(fetchAllDto);

    return res.json({
      status: 200,
      code: "OK",
      users: allUsers,
      message: "Users data in the database",
    });
  };

  fetchUserById = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const dto = FetchUserDto.fetchUser(req.id, parseInt(userId));

    const userFound = await this.userServ.fetchUser(dto);

    return res.json({
      status: 200,
      code: "OK",
      userFound,
      message: "User Found",
    });
  };

  updateUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const dto = UpdateUserDto.updateUser(req.id, parseInt(userId), req.body);

    const updatedUser = await this.userServ.updateUser(dto);

    return res.json({
      status: 200,
      code: "OK",
      updatedUser,
      message: "User data has been updated",
    });
  };

  deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const dto = DeleteUserDto.deleteUserData(req.id, parseInt(userId));

    const deletedUser = await this.userServ.deleteUser(dto);

    return res.json({
      status: 204,
      code: "no_content",
      userDeleted: deletedUser,
      message: "User has been deleted",
    });
  };
}
