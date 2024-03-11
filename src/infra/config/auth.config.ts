import 'dotenv/config';
import env from 'env-var';

const SALT_ROUNDS: number = env.get('SALT_ROUNDS').required().asInt();

const JWT_SECRET: string = env
  .get('JWT_SECRET')
  .default('my_secret')
  .asString();

const JWT_EXPIRATION_SECONDS: number = env
  .get('JWT_EXPIRATION_SECONDS')
  .default(60 * 60 * 4380)
  .asInt();

export default { SALT_ROUNDS, JWT_SECRET, JWT_EXPIRATION_SECONDS };
