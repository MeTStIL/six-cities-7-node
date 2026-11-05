import { Container } from 'inversify';
import { IOfferService } from './offer-service.interface';
import { Component } from '../../types';
import { DefaultOfferService } from './default-offer.service';
import { OfferEntity, OfferModel } from './offer.entity';
import { types } from '@typegoose/typegoose';

export const createOfferContainer = (): Container => {
  const offerContainer = new Container();

  offerContainer.bind<IOfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
};
