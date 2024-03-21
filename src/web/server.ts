import 'reflect-metadata';
import express from 'express';
import config from '../infra/config';
import bodyParser from 'body-parser';
import { bootstrapRoutes } from './routes/product/product.routes';
import contextIdGenerator from './middleware/context-id.middleware';
import dotenv from 'dotenv';
import { bootstrapUserRoutes } from './routes/user/user.routes';
import bootstrapDi from '@infra/db/di';
import ds from '@infra/config/connection.config';

dotenv.config();
export const app = express();
const bootstrap = async () => {
  ds;
  const diContainer = await bootstrapDi();
  // const productRouter = bootstrapRoutes(diContainer.prodController);
  const userRouter = bootstrapUserRoutes(diContainer.userController);

  contextIdGenerator(app);

  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/api', userRouter);
  const PORT = config.PORT;

  app.listen(PORT, () => {
    console.log(`App is live at http://localhost:${PORT}`);
  });
};

bootstrap();
