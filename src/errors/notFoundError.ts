import { AppError } from './appError';

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}
