import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('/login')
  Login(@Body() payload: Partial<User>) {
    this.authService.Login(payload);
  }

  @Post('/register')
  Register(@Body() payload: Partial<User>) {
    this.authService.Register(payload);
  }

  @Post('/forgor-password')
  ForgotPassword(payload) {
    this.authService.ForgotPassword(payload);
  }
}
