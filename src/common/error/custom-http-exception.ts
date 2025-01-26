import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  constructor(
    public message: string,
    public error: string,
    public errorCode: string,
    public statusCode: number = HttpStatus.BAD_REQUEST, // Default to BAD_REQUEST
  ) {
    super(
      {
        statusCode,
        message,
        error,
        errorCode,
        timestamp: new Date().toISOString(),
      },
      statusCode, // Pass statusCode to HttpException
    );
  }
}
