import { HttpStatus } from "@nestjs/common";
import { CustomHttpException } from "../error/custom-http-exception";


export const TryCatch = <T>(func: (...args: any[]) => Promise<T>) => {
  return async (...args: any[]) => {
    try {
      return await func(...args);
    } catch (error) {
      console.error('Error caught in TryCatch:', error);

      // Re-throw known exceptions
      if (error instanceof CustomHttpException) {
        throw error;
      }

      // Wrap unknown exceptions in a CustomHttpException
      throw new CustomHttpException(
        error?.message || 'Unexpected error occurred',
        'SYSTEM',
        'UNKNOWN',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  };
};
