import { app } from '../server';
import { Request, Response } from 'express';

export const testRoute = () => {
  app.post('/test', (req: Request, res: Response) => {
    console.log('Route is working');

    res.status(201).send('Post route is working');
  });
};
