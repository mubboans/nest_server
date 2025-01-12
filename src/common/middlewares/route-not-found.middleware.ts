import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
@Injectable()
export class RouteNotFoundMiddleware implements NestMiddleware {
  use(req: Request, res: Response) {
    const response = {
      message: "Route you're looking for doesn't exist",
      status: 'failed',
      success: false,
    };
    return res.status(404).send(response);
  }
}
