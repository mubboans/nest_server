import { Injectable } from '@nestjs/common';
import { Response } from 'express';
@Injectable()
export class ResponseHelperService {
  returnResponse(res: Response, code: number, message: string, data: any = {}) {
    return res.status(code).send({
      message,
      status: code,
      data,
      success: true,
    });
  }
}
