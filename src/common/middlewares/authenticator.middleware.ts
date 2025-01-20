import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomError } from '../error/custom-error-class';
import { ErrorService } from '../error/error.service';
import { JwtHelperService } from '../services/jwt-helper.service';

@Injectable()
export class AuthenticatorMiddleware implements NestMiddleware {
  constructor(private errService: ErrorService, private jwtService: JwtHelperService){}
  use(req: any, res: any, next: () => void) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return this.errService.throwUnauthorizedError('Token is required')
    }
    const token = authHeader.split(' ')[1]; // Get the token after "Bearer "
    try {
      const decoded = this.jwtService.verifyToken(token);
      req.user = decoded; // Attach the decoded user to the request object
      next(); // Pass control to the next middleware or route handler
    } catch (err) {
      return this.errService.throwUnauthorizedError('Invalid token');
    }
  }
}
