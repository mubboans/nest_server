import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express'
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('/login')
  Login(@Res() res: Response, @Body() payload: LoginDto) {
    this.authService.Login(res,payload);
  }

  @Post('/register')
  Register(@Body() payload: RegisterDto) {
    this.authService.Register(payload);
  }

  @Post('/forgor-password')
  ForgotPassword(payload) {
    this.authService.ForgotPassword(payload);
  }
}
