import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest';
import { Component, Config, ILogger, PinoLogger, RestConfig, TRestSchema } from './shared';

async function bootstrap() {
  const container = new Container();

  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<ILogger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<TRestSchema>>(Component.Config).to(RestConfig).inSingletonScope();

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
