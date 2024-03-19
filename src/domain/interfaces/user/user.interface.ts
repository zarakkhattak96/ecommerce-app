export interface UserInterface {
  id?: number;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  productId: number | null;
  uuid: string;
  phoneNumber: string | null;
  address: string | null;
  city: string | null;
  password: string;
  confirmPassword: string | null;
}

export abstract class UserBaseRepo {
  abstract createUser(user: UserInterface): Promise<UserInterface>;
  abstract fetchAllUsers(): Promise<UserInterface[]>;
  abstract fetchByEmail(email: string): Promise<void> | null;
}
