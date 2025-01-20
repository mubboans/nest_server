import { CreateOptions, FindOptions, Model } from 'sequelize';
import { CustomError } from '../error/custom-error-class';
import { Request } from 'express';

export async function fnPost<T>(model: any, data: any, options: any) {
  try {
    const dataCreated = await model.create(data, options);
    return dataCreated;
  } catch (error) {
    throw new CustomError('Error in creating data', error);
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
    throw new CustomError(error?.message, 500)
  }
}

export async function fnPut(model: any, obj: any, condition: any) {
  try {
    const data = await model.update(obj, { where: condition });
    console.log(data, 'data check');
    if (data[0] !== 0) {
      return true
    }
    else {
      throw new CustomError('No Record Found To Update', 404)
    }
  } catch (error) {
    throw new CustomError(error?.message, error?.code ? error?.code : 500)
  }
}

export async function fnDelete(model: any, condition: any) {
  try {
    const data = await model.destroy({ where: condition, logging: console.log });
    console.log(data, 'data check');
    if (data == 1 || data > 1) {
      return true
    }
    else {
      throw new CustomError('No Record Found To Delete', 404)
    }
  } catch (error) {
    throw new CustomError(error?.message, error?.code ? error?.code : 500)
  }
}
