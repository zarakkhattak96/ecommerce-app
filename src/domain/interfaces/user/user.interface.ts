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

export interface UserBaseRepoInterface {
  createUser(user: UserInterface): Promise<UserInterface>;
  fetchAllUsers(): Promise<UserInterface[]>;
  fetchByEmail(email: string): Promise<void> | null;
  fetchById(id: number): Promise<UserInterface>| null
}
