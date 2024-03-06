import express from 'express';
import config from '../infra/config';
// import { connectDb } from '../infra/db';
import bodyParser from 'body-parser';
import { bootstrapRoutes } from './routes/product/product.routes';
import { bootstrapDi } from '../infra/db/di/product/product.di';
import contextIdGenerator from './middleware/context-id.middleware';
import db from '../infra/db';

export const app = express();
const bootstrap = async () => {
  // await connectDb();
  await db.connect();

  const diContainer = bootstrapDi();

  const userRouter = bootstrapRoutes(diContainer.prodController);

  contextIdGenerator(app);

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
