import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomHttpException } from 'src/common/error/custom-http-exception';
// Adjust path as necessary

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: status,
      message: exception?.message || 'Internal Server Error',
      errorCode: exception.errorCode || 'Server',
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    };

    console.error('Exception caught:', errorResponse);

    response.status(status).json(errorResponse);
  }
}
