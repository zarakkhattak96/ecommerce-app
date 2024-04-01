import { DataSource } from 'typeorm';
import dbConfig from './db.config';
import { UserModel } from '../db/models/user/user.model';
import { ProductModel } from '../db/models/product/product.model';
import { UserPurchases } from '../db/models/user/user-purchases.model';
import { CartModel } from '../db/models/cart/cart.model';

const password = dbConfig.DB_PASSWORD;

const ds = new DataSource({
  useUTC: true,
  type: 'postgres',
  synchronize: false,
  password,
  username: 'ecommerce',
  // entities: [`${__dirname}/../**/*.entity.js`],
  entities: [UserModel, ProductModel, UserPurchases, CartModel],
  schema: 'ecommerce',
  database: 'ecommerce',
  // migrations: ['migrations/1709814588066-migrations.ts'],
});

ds.initialize()
  .then(() => {
    console.log('Db is initialized');
  })
  .catch((e) => console.log(e));

export default ds;
