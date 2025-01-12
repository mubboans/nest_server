import { Injectable } from '@nestjs/common';
import { Model } from 'sequelize-typescript';
import { CustomError } from 'src/common/error/custom-error-class';



@Injectable()
export class DbserviceService {
  async fnGet(model: any, query: any = {}, include: any[] = []) {
    query = {
      where: query,
      order: [['id', 'DESC']],
      include: include.length > 0 ? include : '',
    };
    try {
      const returnRecord = await model.findAll(query);
      return returnRecord;
    } catch (error) {
      throw new CustomError(error?.message, 500);
    }
  }
  async fnUpdate(model: any, obj: any, condition: any) {
    try {
      const data = await model.update(obj, { where: condition });
      if (data[0] !== 0) {
        return true;
      } else {
        throw new CustomError('No Record Found To Update', 404);
      }
    } catch (error) {
      throw new CustomError(error?.message, 500);
    }
  }

  async fnPost(model: any, obj: any) {
    try {
      const user = await model.create(obj);
      return user;
    } catch (error) {
      throw new CustomError(error?.message, 400);
    }
  }

  async fnDelete(model: any, condition: any) {
    try {
      const record = await model.destroy({ where: condition });
      if (record == 1 || record > 1) {
        return true;
      } else {
        throw new CustomError('No Record Found To Delete', 404);
      }
    } catch (error) {
      throw new CustomError(error?.message, 400);
    }
  }
}
