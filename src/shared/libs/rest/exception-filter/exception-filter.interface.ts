import type { NextFunction } from 'express';
import type { TRequest, TResponse } from '../types';
import type { ErrorRdo } from './error.rdo';

export interface IExceptionFilter {
  catch: (error: Error, req: TRequest, res: TResponse<ErrorRdo>, next: NextFunction) => void;
}
