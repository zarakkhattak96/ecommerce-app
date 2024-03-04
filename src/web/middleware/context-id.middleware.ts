import { v4 as uuidv4 } from '@napi-rs/uuid';
import { NextFunction, Request, Response } from 'express';

const contextIdGenerator = (app: Record<string, any>) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    req.id = uuidv4();
    next();
  });
};

export default contextIdGenerator;
