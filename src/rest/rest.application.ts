import { inject, injectable } from 'inversify';
import {
  Component,
  getMongoUri,
  HttpError,
  IConfig,
  IController,
  IDatabaseClient,
  IExceptionFilter,
  ILogger,
  TRequest,
  TResponse,
  TRestSchema,
} from '../shared';
import express, { Express, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class RestApplication {
  private server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<TRestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: IDatabaseClient,
    @inject(Component.OfferController) private readonly offerController: IController,
    @inject(Component.FavoriteController) private readonly favoriteController: IController,
    @inject(Component.UserController) private readonly userController: IController,
    @inject(Component.ExceptionFilter) private readonly appExceptionFilter: IExceptionFilter,
  ) {
    this.server = express();
  }

  private _getConfigField<T extends keyof TRestSchema>(key: T): TRestSchema[T] {
    return this.config.get(key);
  }

  private async _initDb() {
    const mongoUri = getMongoUri({
      username: this._getConfigField('DB_USER'),
      password: this._getConfigField('DB_PASSWORD'),
      host: this._getConfigField('DB_HOST'),
      port: this._getConfigField('DB_PORT'),
      dbName: this._getConfigField('DB_NAME'),
    });

    return this.databaseClient.connect(mongoUri);
  }

  private async _initMiddleware() {
    this.server.use(express.json());
  }

  private async _initExceptionFilters() {
    this.server.use((_req: TRequest, _res: TResponse, next: NextFunction) =>
      next(new HttpError(StatusCodes.NOT_FOUND, 'Route not found.')),
    );
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  private async _initControllers() {
    this.server.use('/offers', this.offerController.router);
    this.server.use('/users', this.userController.router);
    this.server.use('/favorites', this.favoriteController.router);
  }

  private async _initServer() {
    const port = this.config.get('PORT');

    this.server.listen(port);
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database...');
    await this._initDb();
    this.logger.info('Init database completed');

    this.logger.info('Init app-level middleware...');
    await this._initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Init controllers...');
    await this._initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Init exception filters...');
    await this._initExceptionFilters();
    this.logger.info('Exception filters initialization compleated');

    this.logger.info('Try to init server...');
    await this._initServer();
    this.logger.info(`🚀 Server started on http://localhost:${this.config.get('PORT')}`);
  }
}
