import { Rec } from '@shared/types';

export class AppError extends Error {
  constructor(
    readonly description: string,
    readonly code: string = 'invalid_request',
    readonly extra?: Rec,
  ) {
    super(description);
    this.name = 'AppError';
  }
}

export class InvalidData extends AppError {
  constructor(description: string, code = 'invalid_params') {
    super(description, code);
    this.name = 'InvalidData';
  }
}

export class NotFoundError extends AppError {
  constructor(description: string, code = 'not_found') {
    super(description, code);

    this.name = 'NotFoundError';
  }
}

export class AlreadyExists extends AppError {
  constructor(description: string, code = 'already_exists') {
    super(description, code);

    this.name = 'AlreadyExists';
  }
}

export class BadRequest extends AppError {
  constructor(description: string, code = 'bad_request') {
    super(description, code);

    this.name = 'BadRequest';
  }
}

export class NotAuthorized extends AppError {
  constructor(description: string, code = 'not_authorized') {
    super(description, code);

    this.name = 'NotAuthorized';
  }
}
