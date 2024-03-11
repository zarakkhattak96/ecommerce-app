import express from 'express';
import config from '../infra/config';
import bodyParser from 'body-parser';
import { bootstrapRoutes } from './routes/product/product.routes';
import { bootstrapDi } from '../infra/db/di/product/product.di';
import contextIdGenerator from './middleware/context-id.middleware';
import dotenv from 'dotenv';
import { bootstrapAuthRoutes } from './routes/auth/login.routes';

dotenv.config();
export const app = express();
const bootstrap = async () => {
  const diContainer = bootstrapDi();

  const userRouter = bootstrapRoutes(diContainer.prodController);

  const authRouter = bootstrapAuthRoutes(diContainer.authController);

  contextIdGenerator(app);

  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/api', userRouter, authRouter);

  const PORT = config.PORT;

  app.listen(PORT, () => {
    console.log(`App is live at ${PORT}`);
  });
};

bootstrap();
