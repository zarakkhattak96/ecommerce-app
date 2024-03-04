import express from 'express';
import config from '../infra/config/index';
import { connectDb } from '../infra/db';
import bodyParser from 'body-parser';
import { bootstrapRoutes } from './routes/product/product.routes';
import { bootstrapDi } from '../infra/db/di/product/product.di';

export const app = express();
const bootstrap = async () => {
  await connectDb();

  const diContainer = bootstrapDi();

  const userRouter = bootstrapRoutes(diContainer.prodController);

  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/api/products', userRouter);
  const PORT = config.PORT;

  app.listen(PORT, () => {
    console.log(`App is live at ${PORT}`);
  });
};

bootstrap();
