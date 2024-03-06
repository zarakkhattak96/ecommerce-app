import 'dotenv/config';
import env from 'env-var';

const DATABASE_URL: string = env.get('DATABASE_URL').required().asUrlString();
const DB_PASSWORD: string = env.get('DB_PASSWORD').required().asString();
const DB_PORT: number = env.get('DB_PORT').required().asPortNumber();

export default { DATABASE_URL, DB_PASSWORD, DB_PORT };
