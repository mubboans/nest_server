import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { MODEL_CONSTANTS } from 'src/common/constants/variable_contants';
import { fnGet, fnPost } from 'src/common/db_functions/db_helper_functions';

import { ResponseHelperService } from 'src/common/services/response-helper.service';
import { campareHashPassword, encryptPassword } from 'src/common/utils/password-helper';
import { User } from 'src/database/entities/user.entity';
import { ForgotPassword, LoginDto, RegisterDto } from './auth.dto';
import { TryCatch } from 'src/common/utils/try-catch.util';
import { Op } from 'sequelize';
import { JwtHelperService } from 'src/common/services/jwt-helper.service';
import { CustomHttpException } from 'src/common/error/custom-http-exception';

@Injectable()
export class AuthService {

  constructor(@Inject(MODEL_CONSTANTS.USER) private userModel: typeof User,
    private readonly responseHelper: ResponseHelperService, private jwtHelper: JwtHelperService) { }

  async Login(res: Response, payload: LoginDto): Promise<any> {
    const { data } = await fnGet(
      this.userModel,
      {
        [Op.or]: [
          { email: { [Op.eq]:  payload.username } }, // Exact match for email
          { contact: { [Op.eq]: payload.username } }, // Exact match for contact
        ],
      },
      [],
      true,
    );

    if (!data || !data.length) {
      throw new HttpException(
        {
          message:'User not found',
          status:'NOT_FOUND',
          errorCode:'AUTH'},
        HttpStatus.NOT_FOUND
      );
    }

    if (!campareHashPassword(payload.password, data[0]?.password)) {
      throw new CustomHttpException(
        'Invalid credentials',
        'UNAUTHORIZED',
        'AUTH',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!data[0].isActive) {
      throw new CustomHttpException(
        'User is inactive',
        'FORBIDDEN',
        'AUTH',
        HttpStatus.FORBIDDEN,
      );
    }

    const createToken = this.jwtHelper.createToken({
      id: data[0].id,
      email: data[0].email,
      role: data[0].role,
      type: data[0].type,
    });

    return this.responseHelper.returnResponse(res, 200, 'Successfully logged in', {
      id: data[0].id,
      email: data[0].email,
      role: data[0].role,
      type: data[0].type,
      accessToken:createToken,
    });
  }

  async Register (res: Response, payload: RegisterDto) :Promise<any> {
    let checkUser = await this.IsUserRegister({ email: payload.email });
    if (checkUser) {
      throw new CustomHttpException(
        'User Already Register',
        'CONFLICT',
        'AUTH',
        HttpStatus.CONFLICT,
      );
    }
    encryptPassword(payload);
    let createUser = await fnPost(this.userModel, payload);
    let responseBody = { id: createUser.id, email: createUser.email, role: createUser.role, type: createUser.type } as any;
    let createToken = this.jwtHelper.createToken(responseBody);
    responseBody.accessToken = createToken
    return responseBody;

  }

  async ForgotPassword(res: Response, payload: ForgotPassword) {

  }

  async IsUserRegister(query): Promise<boolean> {
    let { data } = await fnGet(this.userModel, query, [], true);
    return data[0];
  }
}
