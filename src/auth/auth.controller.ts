import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express'
import { AuthService } from './auth.service';
import { ForgotPassword, LoginDto, RegisterDto } from './auth.dto';
import { ResponseHelperService } from 'src/common/services/response-helper.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private responseHelper: ResponseHelperService ) { }
  @Post('/login')
  async Login(@Res() res: Response, @Body() payload: LoginDto): Promise<any> {
    try {
      const loginData =await this.authService.Login(payload);
      return this.responseHelper.returnResponse(res, 201, 'Succesfully Login user', loginData);
    } catch (error) {
      throw error;
    }
  }

  @Post('/register')
  async Register(@Res() res: Response, @Body() payload: RegisterDto): Promise<any> {
    try {
      let registerResponse = await this.authService.Register(payload);
      return this.responseHelper.returnResponse(res, 201, 'Succesfully Register user', registerResponse);
    } catch (error) {
      throw error
    }
  }

  @Post('/forgor-password')
  async ForgotPassword(@Res() res: Response, payload: ForgotPassword): Promise<any> {
    try {
      const response = await this.authService.ForgotPassword(payload);
      return this.responseHelper.returnResponse(res,200,"Successfully Change Password")
    } catch (error) {
      throw error
    }
  }
}
