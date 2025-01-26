import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../database/entities/user.entity';
import { MODEL_CONSTANTS } from 'src/common/constants/variable_contants';
import { ResponseHelperService } from 'src/common/services/response-helper.service';
import { Response } from 'express';
import { fnDelete, fnGet, fnPost, fnUpdate } from 'src/common/db_functions/db_helper_functions';

@Injectable()
export class UsersService {
  constructor(@Inject(MODEL_CONSTANTS.USER) private userModel: typeof User,     private readonly responseHelper: ResponseHelperService) { }

  async create(createUserDto: CreateUserDto, res: Response) {
    await fnPost(this.userModel, createUserDto);
    return this.responseHelper.returnResponse(res,201,'Successfully Created User',{})
  }

  async findAll(res: Response) {
    let {data:AllUser} = await fnGet(this.userModel, { attribute: { exclude: ['password'] }, });
    return this.responseHelper.returnResponse(res, 200, 'Succesfully Get User', AllUser);
  }

  async findOne(res: Response, id: number) {
    let findUser = await fnGet(this.userModel,{id:id});
    return this.responseHelper.returnResponse(res, 200,"Succesfully Get User with "+id,findUser);
  }

  async update(res: Response, id: number, updateUserDto: UpdateUserDto) {
    let updateUser = await fnUpdate(this.userModel, updateUserDto, {id});
    return this.responseHelper.returnResponse(res, 200,"Successfully Updated Record ");
  }

  async remove(res: Response, id: number) {
    await fnDelete(this.userModel,{ id });
    return this.responseHelper.returnResponse(res, 200, "Successfully Deleted Record");
  }
}
