import { z } from "zod";
import { ID_SCHEMA, validateData, validateId } from "../utils";

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
    confirmPassword: z.string().nullable(),
  });

  private constructor(
    readonly contextId: string,
    readonly createData: Readonly<z.infer<typeof CreateUserDto.schema>>,
  ) {}

  static createUser(contextId: string, data: unknown): CreateUserDto {
    const validData = validateData(CreateUserDto.schema, data);

    return new CreateUserDto(contextId, validData);
  }
}

export class FetchAllUsersDto {
  private constructor(readonly contextId: string) {}

  static fetchAll(contextId: string): FetchAllUsersDto {
    return new FetchAllUsersDto(contextId);
  }
}

export class FetchUserDto {
  private constructor(
    readonly contextId: string,
    readonly userId: number,
  ) {}

  static fetchUser(contextId: string, userId: number): FetchUserDto {
    const validId = validateId(userId);

    return new FetchUserDto(contextId, validId);
  }
}

export class UpdateUserDto {
  private static readonly schema = z
    .object({
      firstName: z.string().nullable(),
      lastName: z.string().nullable(),
      email: z.string().nullable(),
      productId: z.number().nullable(),
      uuid: z.string(),
      address: z.string().nullable(),
      city: z.string().nullable(),
      password: z.string(),
      confirmPassword: z.string(),
      phoneNumber: z.string().nullable(),
    })
    .partial({ uuid: true, productId: true });

  private constructor(
    readonly contextId: string,
    readonly userId: number,
    readonly updateData: Readonly<z.infer<typeof UpdateUserDto.schema>>,
  ) {}

  static updateUser(
    contextId: string,
    userId: number,
    data: unknown,
  ): UpdateUserDto {
    const validId = validateId(userId);
    const validData = validateData(UpdateUserDto.schema, data);

    return new UpdateUserDto(contextId, validId, validData);
  }
}

export class DeleteUserDto {
  private constructor(
    readonly contextId: string,
    readonly userId: number,
  ) {}

  static deleteUserData(contextId: string, userId: number): DeleteUserDto {
    const validId = validateId(userId);

    return new DeleteUserDto(contextId, validId);
  }
}
