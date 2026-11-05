import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity';
import { CreateOfferDto } from './dto';
import { TId } from '../../types';

export interface IOfferService {
  create: (dto: CreateOfferDto) => Promise<DocumentType<OfferEntity>>;
  findById: (offerId: TId) => Promise<DocumentType<OfferEntity> | null>;
}
