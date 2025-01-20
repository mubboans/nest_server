import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomError } from 'src/common/error/custom-error-class';

@Catch()
export class GlobalExceptionFilter<T> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Check if the exception is an instance of CustomError
    if (exception instanceof CustomError) {
      return response.status(exception.code || 500).json({
        status: exception.status || 'Failed',
        message: exception.message,
        error: exception.error || null,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    // Handle other exceptions (e.g., HttpException)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const responseBody = exception.getResponse();
      return response.status(status).json({
        status: 'Failed',
        message: typeof responseBody === 'string' ? responseBody : (responseBody as any).message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    // Fallback for unhandled exceptions
    console.error('Unhandled exception:', exception);
    return response.status(500).json({
      status: 'Failed',
      message: 'Internal Server Error',
      error: exception.message || null,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }


}
