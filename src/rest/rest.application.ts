import { inject, injectable } from 'inversify';
import { Component, getMongoUri, IConfig, IDatabaseClient, ILogger, TRestSchema } from '../shared';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<TRestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: IDatabaseClient,
  ) {}

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

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database…');
    await this._initDb();
    this.logger.info('Init database completed');
  }
}
