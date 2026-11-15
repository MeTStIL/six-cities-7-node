import { plainToInstance, type ClassConstructor } from 'class-transformer';
import { StatusCodes } from 'http-status-codes';
import { isObjectIdOrHexString } from 'mongoose';
import { HttpError } from '../libs';

export const fillDTO = <T>(dto: ClassConstructor<T>, source: object) =>
  plainToInstance(dto, source, { excludeExtraneousValues: true });

export const getObjectId = (value: unknown, field: string): string => {
  if (typeof value !== 'string' || !isObjectIdOrHexString(value)) {
    throw new HttpError(StatusCodes.BAD_REQUEST, `${field} must be a MongoDB ObjectId.`);
  }

  return value;
};
