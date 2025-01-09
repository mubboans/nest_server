import { CreateOptions, FindOptions, Model } from 'sequelize';
import { CustomError } from '../error/custom-error-class';

export async function fnPost<T>(
  model: typeof Model<T, any>,
  data: Partial<T>,
  options: CreateOptions,
) {
  // try {
  //   const dataCreated = await model.create(data, options); // Call `create` on the model class
  //   return dataCreated;
  // } catch (error) {
  //   // Throw the error so NestJS can handle it
  //   throw new CustomError('Error in creating data', error);
  // }
}

export async function fnGet<T>(
  model: typeof Model<T, any>, // Use `typeof Model` to refer to the model class
  options?: FindOptions,
) {
  // try {
  //   if (options?.where && 'id' in options.where) {
  //     const data = await model.findByPk(options.where.id, options);
  //     return data as T | null;
  //   } else if (options?.where) {
  //     const data = await model.findOne(options);
  //     return data as T | null;
  //   } else {
  //     const data = await model.findAll(options);
  //     return data as T[];
  //   }
  // } catch (error) {
  //   // Return the error instead of throwing it
  //   throw new CustomError('Error in fetching data', error);
  // }
}

export function fnPut() {
  try {

  } catch (error) {

  }
}

export function fnDelete() {
  try {

  } catch (error) {

  }
}
