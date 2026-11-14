import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity';
import { CreateOfferDto, UpdateOfferDto } from './dto';
import { TCity, TId } from '../../types';

type TDocumentOfferEntity = DocumentType<OfferEntity>;

export interface IOfferService {
  create: (dto: CreateOfferDto) => Promise<TDocumentOfferEntity>;
  find: (limit?: number) => Promise<Array<TDocumentOfferEntity>>;
  findPremiumByCity: (city: TCity, limit?: number) => Promise<Array<TDocumentOfferEntity>>;
  findById: (offerId: TId) => Promise<TDocumentOfferEntity | null>;
  findManyByIds: (offerIds: Array<TId>) => Promise<Array<TDocumentOfferEntity>>;
  updateById: (offerId: TId, dto: UpdateOfferDto) => Promise<TDocumentOfferEntity | null>;
  deleteById: (offerId: TId) => Promise<TDocumentOfferEntity | null>;
  incCommentCountAndRating: (offerId: TId, rating: number) => Promise<TDocumentOfferEntity | null>;
  exists: (offerId: TId) => Promise<boolean>;
}
