import { PasswordHashingService } from '@app/services/password-hashing.service';
import config from '@infra/config/index';
import { hash, verify } from '@node-rs/bcrypt';

export class PasswordHashingBcrypt extends PasswordHashingService {
  async hash(plainTextPass: string): Promise<string> {
    return hash(plainTextPass, config.authConfig.SALT_ROUNDS);
  }

  async verifyPassword(
    plainTextPass: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await verify(plainTextPass, hashedPassword);
  }
}
