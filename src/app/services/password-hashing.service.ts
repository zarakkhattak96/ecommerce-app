export abstract class PasswordHashingService {
  abstract hash(plainTextPass: string): Promise<string>;

  abstract verifyPassword(
    plainTextPass: string,
    hashedPass: string,
  ): Promise<boolean>;
}
