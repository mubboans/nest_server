import { Controller, Get, Req, Res, Logger, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/health-check')
  @HttpCode(201)
  getHello(@Req() req: Request): { ipAddress?: string, currentUrl?: string } {
    console.log("check the log");
    return this.appService.getHello(req);
  }

}
