import { UserModel } from "@infra/db/models/user/user.model";
import { z } from "zod";
import { validateData } from "../utils";

export class LoginDto {
  private static readonly schema = z.object({
    email: z.string(),
    password: z.string().min(3),
  });

  private constructor(
    readonly email: string,
    readonly password: string,
    readonly user: UserModel,
  ) {}

  static create(data: unknown, user: UserModel): LoginDto {
    const { email, password } = LoginDto.schema.parse(data);

    return new LoginDto(email, password, user);
  }
}

// export class CreateUserDto {
//   private static readonly schema = z.object({
//     firstName: z.string(),
//     lastName: z.string(),
//     email: z.string(),
//     password: z.string(),
//     confirmPassword: z.string(),
//     productId: z.number(),
//     uuid: z.string(),
//     phoneNumber: z.string(),
//     address: z.string(),
//     city: z.string(),
//   });

//   private constructor(
//     readonly contextId: string,
//     readonly createData: Readonly<z.infer<typeof CreateUserDto.schema>>,
//     readonly data: unknown,
//   ) {}

//   static create(contextId: string, data: unknown): CreateUserDto {
//     const validData = validateData(CreateUserDto.schema, data);

//     return new CreateUserDto(contextId, validData, data);
//   }
// }
