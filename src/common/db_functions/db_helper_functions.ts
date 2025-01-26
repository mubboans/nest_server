import { CreateOptions, FindOptions, Model } from 'sequelize';
import { Request } from 'express';
import { HttpStatus } from '@nestjs/common';
import { CustomHttpException } from '../error/custom-http-exception';

export async function fnPost<T>(model: any, data: any, options?: any) {
  try {
    const dataCreated = await model.create(data, options);
    return dataCreated;
  } catch (error) {
    throw new CustomHttpException(
      error?.message ?? 'Error in creating data',
      'SYSTEM',
      'DB',
      HttpStatus.BAD_REQUEST,
    );
  }
}

export async function fnGet<T>(model: any, query?: any, include = [], raw: boolean = false, orderBy: string = "id", direction: string = "DESC") {
  try {
    let options;
    let pageno;
    if (query.limit && query.offset) {
      pageno = Number(query.offset);
      options = {
        limit: Number(query.limit),
        offset: (pageno - 1) * query.limit,
        // logging: console.log
      }
      delete query.limit;
      delete query.offset;
    }
    if (query.attribute) {
      options = {
        ...options,
        attributes: query.attribute
      }
      delete query.attribute;
    }
    options = {
      ...options,
      // raw: true,
      raw,
      where: { ...query },
      order: [[orderBy, direction]],
      include: include.length > 0 ? include : '',
      // logging: console.log
    }
    if (options.limit) {
      let { rows, count } = await model.findAndCountAll(options);
      return {
        config: {
          totalPage: Math.ceil(count / options.limit),
          totalRecords: count,
          currentPage: pageno,
          currentLimit: options.limit
        },
        data: rows
      }
    }
    else {
      let data = await model.findAll(options);
      return { config: {}, data };
    }
  } catch (error) {
    throw new CustomHttpException(
      error?.message ?? 'Error in getting data',
      'SYSTEM',
      'DB',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function fnUpdate(model: any, obj: any, condition: any) {
  try {
    const data = await model.update(obj, { where: condition });
    console.log(data, 'data check');
    if (data[0] !== 0) {
      return true
    }
    else {
      throw new CustomHttpException(
        'No Record Found To Update',
        'SYSTEM',
        'DB',
        HttpStatus.NOT_FOUND,
      );
    }
  } catch (error) {
    throw new CustomHttpException(
      error?.message ?? "Failed to Update Record",
      'SYSTEM',
      'DB',
      HttpStatus.BAD_REQUEST,
    );
  }
}

export async function fnDelete(model: any, condition: any) {
  try {
    const data = await model.destroy({ where: condition});
    console.log(data, 'data check');
    if (data == 1 || data > 1) {
      return true
    }
    else {
      throw new CustomHttpException(
        'No Record Found To Delete',
        'SYSTEM',
        'DB',
        HttpStatus.NOT_FOUND,
      );
    }
  } catch (error) {
    throw new CustomHttpException(
      error?.message ?? "Failed to Delete Record",
      'SYSTEM',
      'DB',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
