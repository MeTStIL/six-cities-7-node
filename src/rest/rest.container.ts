import { Container } from 'inversify';
import { RestApplication } from './rest.application';
import {
  Component,
  IConfig,
  IDatabaseClient,
  ILogger,
  MongoDatabaseClient,
  PinoLogger,
  RestConfig,
  TRestSchema,
} from '../shared';

export const createRestApplicationContainer = (): Container => {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<ILogger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<IConfig<TRestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<IDatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  return restApplicationContainer;
};
