import { inject, injectable } from 'inversify';
import { ICommentService } from './comment-service.interface';
import { Component, SortType } from '../../types';
import { ILogger } from '../../libs';
import { types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity';
import { IOfferService } from '../offer';
import { DEFAULT_COMMENTS_COUNT } from './comment.constants';

@injectable()
export class DefaultCommentService implements ICommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
  ) {}

  public create: ICommentService['create'] = async (dto) => {
    const comment = await this.commentModel.create(dto);

    this.logger.info(`New comment posted for offer ${dto.offerId} by ${dto.authorId}`);

    await this.offerService.incCommentCountAndRating(dto.offerId, dto.rating);

    return comment.populate('authorId');
  };

  public findByOfferId: ICommentService['findByOfferId'] = async (offerId, limit) =>
    this.commentModel
      .find({ offerId })
      .sort({ createdAt: SortType.Down })
      .limit(limit ?? DEFAULT_COMMENTS_COUNT)
      .populate('authorId')
      .exec();

  public deleteByOfferId: ICommentService['deleteByOfferId'] = async (offerId) => {
    const result = await this.commentModel.deleteMany({ offerId }).exec();

    return result.deletedCount;
  };
}
