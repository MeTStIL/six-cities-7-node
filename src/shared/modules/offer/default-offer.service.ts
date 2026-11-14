import { inject, injectable } from 'inversify';
import { IOfferService } from './offer-service.interface';
import { Component, TId } from '../../types';
import { ILogger } from '../../libs';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity';
import { CreateOfferDto } from './dto';

@injectable()
export class DefaultOfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public create = async (dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> => {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  };

  public findById = async (offerId: TId): Promise<DocumentType<OfferEntity> | null> =>
    this.offerModel.findById(offerId).exec();
}
