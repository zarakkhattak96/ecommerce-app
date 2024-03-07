import { type DataSourceOptions } from 'typeorm';
import config from '.';

export const baseConfig: DataSourceOptions = {
  url: config.DB_URL,
  useUTC: true,
  type: 'postgres',
  synchronize: false,
  schema: 'ecommerce',
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
};
