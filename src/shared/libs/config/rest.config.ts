import { Config } from './config.interface';
import { REST_SCHEMA_CONFIG, TRestSchema } from './rest.schema';
import { inject, injectable } from 'inversify';
import { Component } from '../../types';
import { ILogger } from '../logger';
import { config } from 'dotenv';

@injectable()
export class RestConfig implements Config<TRestSchema> {
  private readonly config: TRestSchema;

  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error("Can't read .env file. Perhaps the file does not exists.");
    }

    REST_SCHEMA_CONFIG.load({});
    REST_SCHEMA_CONFIG.validate({ allowed: 'strict', output: (message) => this.logger.info(message) });

    this.config = REST_SCHEMA_CONFIG.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof TRestSchema>(key: T): TRestSchema[T] {
    return this.config[key];
  }
}
