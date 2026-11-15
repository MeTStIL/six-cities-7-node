import { inject, injectable } from 'inversify';
import type { IExceptionFilter } from './exception-filter.interface';
import { Component } from '../../../types';
import type { ILogger } from '../../logger';
import type { NextFunction } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { STATUS_CODES } from 'node:http';
import { HttpError } from '../errors';
import type { TRequest, TResponse } from '../types';
import { ErrorRdo } from './error.rdo';

@injectable()
export class AppExceptionFilter implements IExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: ILogger) {}

  public catch(
    error: Error & { status?: number },
    _req: TRequest,
    res: TResponse<ErrorRdo>,
    next: NextFunction,
  ): void {
    if (res.headersSent) {
      this.logger.error(error.message, error);
      next(error);
      return;
    }

    const statusCode = error instanceof HttpError ? error.httpStatusCode : error.status;
    if (statusCode !== undefined && Number.isInteger(statusCode) && statusCode >= 400 && statusCode <= 599) {
      return this.handleHttpError(error, res, statusCode);
    }

    this.handleOtherError(error, res);
  }

  private handleHttpError(error: Error, res: TResponse<ErrorRdo>, statusCode: number): void {
    const errorName = STATUS_CODES[statusCode] ?? 'Error';
    const message = error instanceof HttpError ? error.message : errorName;

    if (statusCode < StatusCodes.INTERNAL_SERVER_ERROR) {
      this.logger.warn(message);
    } else {
      this.logger.error(message, error);
    }

    res.status(statusCode).json(new ErrorRdo(errorName, message));
  }

  private handleOtherError(error: Error, res: TResponse<ErrorRdo>): void {
    const message = ReasonPhrases.INTERNAL_SERVER_ERROR;
    this.logger.error(message, error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ErrorRdo(message, message));
  }
}
