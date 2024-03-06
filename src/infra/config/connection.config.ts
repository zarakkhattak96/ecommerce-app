import { DataSource, DataSourceOptions } from 'typeorm';
import { baseConfig } from './base-config';
import { ProductModel } from '../db/models/product/product.model';
import { UserModel } from '../db/models/user/user.model';
import config from '.';
import dbConfig from './db.config';

const password = dbConfig.DB_PASSWORD;

const ds = new DataSource({
  ...baseConfig,
  // schema: "public",
  schema: 'public',
  entities: [ProductModel, UserModel],
  // username: config.POSTGRES_DB_USER,
  password: password,
  // database: 'ecommerce',
} as DataSourceOptions);

await ds.initialize();

export default ds;
