import { injectable } from 'inversify';
import { BadRequestError } from './badRequestError';
import { DbError } from './dbError';
import { PostgresErrorCode } from './dbErrorCodes';

export interface IErrorMapper {
  mapRepositoryError(error: unknown): BadRequestError | DbError;
}

@injectable()
export class ErrorMapper implements IErrorMapper {
  mapRepositoryError(err: unknown): BadRequestError | DbError {
    if (typeof err === 'object' && 'code' in err! && 'detail' in err) {
      if (
        err.code === PostgresErrorCode.UNIQUE_VIOLATION ||
        err.code === PostgresErrorCode.NOT_NULL_VIOLATION ||
        err.code === PostgresErrorCode.FOREIGN_KEY_VIOLATION
      ) {
        return new BadRequestError(err.detail as string);
      }
    }

    return new DbError('Something went wrong');
  }
}
