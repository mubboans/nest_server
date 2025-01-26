import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CustomHttpException } from '../error/custom-http-exception';


@Injectable()
export class JwtHelperService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  createToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1h', // Token expires in 1 hour
    });
  }

  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      throw new CustomHttpException(
        'Token is Malform',
        'SYSTEM',
        'AUTH',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
