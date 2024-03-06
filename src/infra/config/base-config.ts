import { type DataSourceOptions } from 'typeorm';
import config from '.';

// const sslOpts: Record<string, any> = {};
// if (config.app.NODE_ENV === 'PROD') {
//   sslOpts.ssl = true; // otherwise, you get the pg_hba.conf no entry error
//   sslOpts.extra = { ssl: { rejectUnauthorized: false } }; // required because the RDS certificates are self-signed, and openssl rejects them otherwise
// }

export const baseConfig: DataSourceOptions = {
  url: config.DB_URL,
  useUTC: true,
  // password: dbConfig.DB_PASSWORD,

  type: 'postgres',

  synchronize: false,
};
