import { injectable } from 'inversify';
import type { IController } from './controller.interface';
import type { ILogger } from '../../logger';
import asyncHandler from 'express-async-handler';
import type { IRoute, TResponse, TResponseLocals } from '../types';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const DEFAULT_CONTENT_TYPE = 'application/json';

@injectable()
export abstract class BaseController implements IController {
  private readonly _router: Router;

  constructor(protected readonly logger: ILogger) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute<P, R, B, Q>(route: IRoute<P, R, B, Q>): void {
    const wrappedAsyncHandler = asyncHandler<P, R, B, Q>(route.handler.bind(this));
    this._router[route.method]<P, R, B, Q, TResponseLocals>(route.path, wrappedAsyncHandler);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: TResponse<T>, statusCode: number, data: T): void {
    res.type(DEFAULT_CONTENT_TYPE).status(statusCode).json(data);
  }

  public created<T>(res: TResponse<T>, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent(res: TResponse<never>): void {
    res.status(StatusCodes.NO_CONTENT).end();
  }

  public ok<T>(res: TResponse<T>, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
