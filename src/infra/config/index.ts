import * as dotenv from 'dotenv';
import appConfig from './app.config';
import dbConfig from './db.config';
import authConfig from './auth.config';

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

export default {
  DB_URL,
  PORT,
  appConfig: appConfig,
  dbConfig: dbConfig,
  authConfig: authConfig,
};
