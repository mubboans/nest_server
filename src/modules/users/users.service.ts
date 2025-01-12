import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../database/entities/user.entity';
import { DbserviceService } from 'src/database/dbservice/dbservice.service';
import { MODEL_CONSTANTS } from 'src/common/constants/variable_contants';
import { ResponseHelperService } from 'src/common/services/response-helper.service';
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(@Inject(MODEL_CONSTANTS.USER) private userModel: typeof User, private readonly db: DbserviceService,
    private readonly responseHelper: ResponseHelperService) { }

  async create(createUserDto: CreateUserDto, res: Response) {
    await this.db.fnPost(this.userModel, createUserDto);
    return this.responseHelper.returnResponse(res,201,'Successfully Created User',{})
  }

  async findAll(res: Response) {
    let allUser = await this.db.fnGet(this.userModel,{});
    return this.responseHelper.returnResponse(res,200,'Succesfully Get User',allUser);
  }

  async findOne(res: Response, id: number) {
    let findUser = await this.db.fnGet(this.userModel,{id:id});
    return this.responseHelper.returnResponse(res, 200,"Succesfully Get User",findUser);
  }

  async update(res: Response, id: number, updateUserDto: UpdateUserDto) {
    let updateUser = await this.db.fnUpdate(this.userModel, updateUserDto, {id});
    return this.responseHelper.returnResponse(res,200,"Succ Update");
  }

  async remove(res: Response, id: number) {
    await this.db.fnDelete(this.userModel,{ id });
    return this.responseHelper.returnResponse(res, 200, "Succ Update");
  }
}
