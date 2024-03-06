import { AppError } from './appError';

export class DbError extends AppError {
  constructor(message: string) {
    super(message, 500);
  }
}
