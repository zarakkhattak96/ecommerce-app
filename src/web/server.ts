import express from 'express';
import config from '../infra/config/index';
import { connectDb } from '../infra/db';
import { testRoute } from './controllers/test.controller';

export const app = express();
const bootstrap = async () => {
  await connectDb();
  testRoute();

  const PORT = config.PORT;

  app.listen(PORT, () => {
    console.log(`App is live at ${PORT}`);
  });
};

bootstrap();
