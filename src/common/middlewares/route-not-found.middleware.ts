import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
@Injectable()
export class RouteNotFoundMiddleware implements NestMiddleware {
  use(req: Request, res: Response) {
    const response = {
      success: false,
      statusCode: 500,
      message: "Route not found",
      errorCode: 'SYSTEM_ERROR',
      timestamp: new Date().toISOString()
    };
    return res.status(404).send(response);
  }
}
