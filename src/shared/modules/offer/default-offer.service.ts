import { inject, injectable } from 'inversify';
import { IOfferService } from './offer-service.interface';
import { Component, SortType } from '../../types';
import { ILogger } from '../../libs';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity';
import { CreateOfferDto } from './dto';
import { DEFAULT_OFFERS_COUNT, DEFAULT_PREMIUM_OFFERS_COUNT } from './offer.constants';

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

  public find: IOfferService['find'] = async (limit) =>
    this.offerModel
      .find()
      .sort({ postDate: SortType.Down })
      .limit(limit ?? DEFAULT_OFFERS_COUNT)
      .populate('authorId')
      .exec();

  public findPremiumByCity: IOfferService['findPremiumByCity'] = async (city, limit) =>
    this.offerModel
      .find({ city, isPremium: true })
      .sort({ postDate: SortType.Down })
      .limit(limit ?? DEFAULT_PREMIUM_OFFERS_COUNT)
      .populate('authorId')
      .exec();

  public findById: IOfferService['findById'] = async (offerId) =>
    this.offerModel.findById(offerId).populate('authorId').exec();

  public findManyByIds: IOfferService['findManyByIds'] = async (offerIds) =>
    this.offerModel
      .find({ _id: { $in: offerIds } })
      .sort({ postDate: SortType.Down })
      .populate('authorId')
      .exec();

  public updateById: IOfferService['updateById'] = async (offerId, dto) =>
    this.offerModel.findByIdAndUpdate(offerId, dto, { new: true }).populate('authorId').exec();

  public deleteById: IOfferService['deleteById'] = async (offerId) =>
    this.offerModel.findByIdAndDelete(offerId).populate('authorId').exec();

  public incCommentCountAndRating: IOfferService['incCommentCountAndRating'] = async (offerId, rating) => {
    const offer = await this.offerModel.findById(offerId);

    if (!offer) {
      return null;
    }

    const oldCount = offer.commentsCount ?? 0;
    const oldRating = offer.rating ?? 0;
    const newCount = oldCount + 1;
    const updatedRating = Number(((oldRating * oldCount + rating) / newCount).toFixed(1));

    return this.offerModel
      .findByIdAndUpdate(
        offerId,
        {
          $set: { rating: updatedRating },
          $inc: { commentsCount: 1 },
        },
        { new: true },
      )
      .populate('authorId')
      .exec();
  };

  public exists: IOfferService['exists'] = async (offerId) => (await this.offerModel.exists({ _id: offerId })) !== null;
}
