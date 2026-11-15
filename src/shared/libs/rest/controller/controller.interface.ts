import type { Router } from 'express';
import type { IRoute, TResponse } from '../types';

export interface IController {
  readonly router: Router;
  addRoute: <P, R, B, Q>(route: IRoute<P, R, B, Q>) => void;
  send: <T>(res: TResponse<T>, statusCode: number, data: T) => void;
  ok: <T>(res: TResponse<T>, data: T) => void;
  created: <T>(res: TResponse<T>, data: T) => void;
  noContent: (res: TResponse<never>) => void;
}
