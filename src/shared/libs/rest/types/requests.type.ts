import type { Request, Response } from 'express';

export type TRequestParams = Record<string, string>;
export type TRequestQuery = Record<string, unknown>;
export type TResponseLocals = Record<string, unknown>;

export type TRequest<
  P = TRequestParams,
  R = unknown,
  B = unknown,
  Q = TRequestQuery,
> = Request<P, R, B, Q, TResponseLocals>;

export type TResponse<R = unknown> = Response<R, TResponseLocals>;
