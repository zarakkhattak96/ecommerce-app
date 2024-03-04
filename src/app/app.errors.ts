export class AppError extends Error {
  constructor(
    readonly description: string,
    readonly code: string = 'invalid_request',
    readonly extra?: Record<string, any>,
  ) {
    super(description);
    this.name = 'AppError';
  }
}

export class InvalidData extends AppError {
  constructor(description: string) {
    super(description);
    this.name = 'InvalidData';
  }
}

export class NotFoundError extends AppError {
  constructor(description: string) {
    super(description);
    this.name = 'NotFound';
  }
}
