// import mongoose from 'mongoose';
// import config from '../config';

// const connectionString = config.DB_URL
import pg from 'pg';
import config from '../config';

const { Client } = pg;

const db = new Client({
  connectionString: config.DB_URL,
  password: config.POSTGRES_DB_PASSWORD,
  // port: config.POSTGRES_DB_PORT
  host: config.POSTGRES_DB_HOST,
  user: config.POSTGRES_DB_USER,
});

export default db;
