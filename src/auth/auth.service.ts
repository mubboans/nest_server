import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { MODEL_CONSTANTS } from 'src/common/constants/variable_contants';
import { fnGet } from 'src/common/db_functions/db_helper_functions';
import { CustomError } from 'src/common/error/custom-error-class';
import { ResponseHelperService } from 'src/common/services/response-helper.service';
import { campareHashPassword } from 'src/common/utils/password-helper';
import { DbserviceService } from 'src/database/dbservice/dbservice.service';
import { User } from 'src/database/entities/user.entity';
import { LoginDto, RegisterDto } from './auth.dto';
import { TryCatch } from 'src/common/utils/try-catch.util';
import { Op } from 'sequelize';

@Injectable()
export class AuthService {

  constructor(@Inject(MODEL_CONSTANTS.USER) private userModel: typeof User, private readonly db: DbserviceService,
    private readonly responseHelper: ResponseHelperService) { }

  Login = TryCatch(async (res: Response, payload: LoginDto)=>{
    let { data } = await fnGet(this.userModel, {
      [Op.or]: [
        { email: { [Op.eq]: payload.username } }, // Exact match for email
        { contact: { [Op.eq]: payload.username } }, // Exact match for contact
      ],
     }, [], true);
    if (!campareHashPassword(payload.password, data[0]?.password)) throw new CustomError('Invalid Credential', 400);
    return this.responseHelper.returnResponse(res, 200, 'Successfully login', data);
  }
  )

  Register = TryCatch(async (payload)=>{
    let checkUser = await this.IsUserRegister({ email: payload.email });
    if (checkUser) {
      throw new CustomError('User Already Register', 401);
    }
    return checkUser;
  })

  ForgotPassword(payload) {

  }

  async IsUserRegister(query): Promise<boolean> {
    let { data } = await fnGet(this.userModel, query,[],true);
     return data[0];
  }
}
