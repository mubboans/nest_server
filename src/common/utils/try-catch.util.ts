import { CustomError } from "../error/custom-error-class";

export const TryCatch = <T>(func: (...args: any[]) => Promise<T>) => {
  return async (...args: any[]) => {
    try {
      return await func(...args);
    } catch (error) {
      console.error('Error caught in TryCatch:', error);
      // Handle known error types
      if (error instanceof CustomError) {
        return new CustomError(error.message, error.code || 400);
      }
      // Handle unknown errors
      return new CustomError('Internal Server Error', 503);
    }
  };
};
