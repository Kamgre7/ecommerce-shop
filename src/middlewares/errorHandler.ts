import { Request, Response } from 'express';
import { AppError } from '../errors/appError';

export const errorHandler = (error: Error, req: Request, res: Response) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message,
    });
  }

  return res.status(500).json({
    error: 'Something went wrong, please try again later!',
  });
};
