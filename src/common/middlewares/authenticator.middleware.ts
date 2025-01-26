import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtHelperService } from '../services/jwt-helper.service';
import { NextFunction } from 'express';
import { CustomHttpException } from '../error/custom-http-exception';

@Injectable()
export class AuthenticatorMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtHelperService){}
  use(req: any, res: any, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomHttpException(
        'Token is required',
        'SYSTEM',
        'AUTH',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verifyToken(token);
      req.user = decoded;
      next();
    } catch (err) {
      throw new CustomHttpException(
        err?.message || 'Invalid Token',
        'SYSTEM',
        'AUTH',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
