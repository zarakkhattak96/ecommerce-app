import { AppError } from '@app/app.errors';
import { Response } from 'express';

const CODE_TO_STATUS = new Map<string, number>([
  ['not_found', 404],
  ['invalid_request', 400],
  ['bad_request', 400],
]);

const handleError = (err: AppError, resp: Response) => {
  const status = CODE_TO_STATUS.get(err.code) || 400;

  const extra = err.extra || {};

  const body = { code: err.code, description: err.description, ...extra };

  return resp.status(status).send(body);
};
