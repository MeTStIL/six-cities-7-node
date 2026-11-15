import { Container } from 'inversify';
import { IOfferService } from './offer-service.interface';
import { Component } from '../../types';
import { DefaultOfferService } from './default-offer.service';
import { OfferEntity, OfferModel } from './offer.entity';
import { types } from '@typegoose/typegoose';
import { IController } from '../../libs';
import { OfferController } from './offer.controller';
import { FavoriteController } from './favorite.controller';

export const createOfferContainer = (): Container => {
  const offerContainer = new Container();

  offerContainer.bind<IOfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<IController>(Component.OfferController).to(OfferController).inSingletonScope();
  offerContainer.bind<IController>(Component.FavoriteController).to(FavoriteController).inSingletonScope();

  return offerContainer;
};
