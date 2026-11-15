import type { NextFunction } from 'express';
import type { HttpMethod } from './http-method.enum';
import type { TRequest, TResponse } from './requests.type';

export interface IRoute<P, R, B, Q> {
  path: string;
  method: HttpMethod;
  handler: (req: TRequest<P, R, B, Q>, res: TResponse<R>, next: NextFunction) => void | Promise<void>;
}
