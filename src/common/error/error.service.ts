import { Injectable } from '@nestjs/common';
import { CustomError } from './custom-error-class';
import { ErrorCodes } from '../constants/error_constant';


@Injectable()
export class ErrorService {

  throwValidationError(message: string, errors?: string) {
    throw new CustomError(message, 400, ErrorCodes.VALIDATION_ERROR, errors);
  }

  throwDatabaseError(message: string, errors?: string) {
    throw new CustomError(message, 500, ErrorCodes.DATABASE_ERROR, errors);
  }

  throwUnauthorizedError(message: string = 'Unauthorized access') {
    throw new CustomError(message, 401, ErrorCodes.UNAUTHORIZED);
  }

  throwNotFoundError(message: string = 'Resource not found') {
    throw new CustomError(message, 404, ErrorCodes.NOT_FOUND);
  }

  throwBadRequestError(message: string, errors?: string) {
    throw new CustomError(message, 400, ErrorCodes.BAD_REQUEST, errors);
  }
}
