import { AppError } from './appError';

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 403);
  }
}
