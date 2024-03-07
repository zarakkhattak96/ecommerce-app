import 'dotenv/config';
import env from 'env-var';

const DATABASE_URL: string = env.get('DATABASE_URL').required().asUrlString();
const DB_PASSWORD: string = env.get('DB_PASSWORD').required().asString();
const DB_PORT: number = env.get('DB_PORT').required().asPortNumber();
const DB_HOST: string = env.get('DB_HOST').required().asString();
const DB_USER: string = env.get('DB_USER').required().asString();

export default { DATABASE_URL, DB_PASSWORD, DB_PORT, DB_HOST, DB_USER };
