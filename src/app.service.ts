import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
@Injectable()
export class AppService {
  getHello(req: Request): { ipAddress?: string, currentUrl?: string } {
    let reponseObj = {
      ipAddress: req?.ip,
      currentUrl: req?.originalUrl,
    };
    return reponseObj;
  }
}
