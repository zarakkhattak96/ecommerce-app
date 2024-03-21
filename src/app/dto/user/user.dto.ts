import { z } from "zod";
import { validateData } from "../utils";


export class CreateUserDto {

  private static readonly schema = z.object({
    id: z.number().optional(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    email: z.string().nullable(),
    productId: z.number().nullable(),
    uuid: z.string().uuid().nullable().optional(),
    phoneNumber: z.string().nullable(),
    address: z.string().nullable(),
    city: z.string().nullable(),
    password: z.string().nullable(),
    confirmPassword: z.string().nullable()
  })

  private constructor(readonly contextId: string, readonly createData: Readonly<z.infer<typeof CreateUserDto.schema>>) { }

  static createUser(contextId: string, data: unknown): CreateUserDto {

    const validData = validateData(CreateUserDto.schema, data);

    return new CreateUserDto(contextId, validData)
  }

}

export class FetchAllUsersDto{

  private constructor(readonly contextId: string){}

  static fetchAll(contextId: string, ): FetchAllUsersDto{

    return new FetchAllUsersDto(contextId)
  }
}
