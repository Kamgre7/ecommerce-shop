import { AppError } from './appError';

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}
