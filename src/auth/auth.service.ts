import { Inject, Injectable } from '@nestjs/common';
import { MODEL_CONSTANTS } from 'src/common/constants/variable_contants';
import { fnGet } from 'src/common/db_functions/db_helper_functions';
import { CustomError } from 'src/common/error/custom-error-class';
import { ResponseHelperService } from 'src/common/services/response-helper.service';
import { DbserviceService } from 'src/database/dbservice/dbservice.service';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(@Inject(MODEL_CONSTANTS.USER) private userModel: typeof User, private readonly db: DbserviceService,
    private readonly responseHelper: ResponseHelperService){}

  Login(payload) {

  }

  async Register(payload) {
    let checkUser = await this.IsUserRegister({email:payload.email});
    if (checkUser){
      return new CustomError('User Already Register',401,'Duplicate User Error');
    }

  }

  ForgotPassword(payload) {

  }

  async IsUserRegister(query):Promise<boolean>{
    let User = await this.db.fnGet(this.userModel, query);
    return User && User?.length
  }
}
