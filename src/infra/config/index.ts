import * as dotenv from 'dotenv';

dotenv.config();

const getFromEnv = (key: string) => {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(`${key} is not defined in env`);
  }

  return value;
};

const DB_URL = getFromEnv('DATABASE_URL');
const PORT = getFromEnv('PORT');
// const POSTGRES_DB_PORT = getFromEnv('POSTGRES_DB_PORT');
// const POSTGRES_DB_HOST = getFromEnv('POSTGRES_DB_HOST');
// const POSTGRES_DB_PASSWORD = getFromEnv('POSTGRES_DB_PASSWORD');
// const POSTGRES_DB_USER = getFromEnv('POSTGRES_DB_USER');

export default {
  DB_URL,
  PORT,
  // POSTGRES_DB_PORT,
  // POSTGRES_DB_HOST,
  // POSTGRES_DB_PASSWORD,
  // POSTGRES_DB_USER,
};
