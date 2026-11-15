import { inject, injectable } from 'inversify';
import { BaseController, HttpError, HttpMethod, type ILogger, type TResponse } from '../../libs';
import { Component } from '../../types';
import { StatusCodes } from 'http-status-codes';
import type { IOfferService } from './offer-service.interface';
import { fillDTO, getObjectId } from '../../helpers';
import { OfferRdo, ShortOfferRdo } from './rdo';
import { UpdateOfferDto } from './dto';
import { isAvailableCity } from '../../guards';
import type { IUserService } from '../user';
import type { ICommentService } from '../comment';
import type {
  TCreateOfferRequest,
  TOfferDetailsRequest,
  TOfferListRequest,
  TPremiumOffersRequest,
  TRemoveOfferRequest,
  TUpdateOfferRequest,
} from './offer-requests.type';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
    @inject(Component.UserService) private readonly userService: IUserService,
    @inject(Component.CommentService) private readonly commentService: ICommentService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.GET, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.POST, handler: this.create });
    this.addRoute({ path: '/premium/:city', method: HttpMethod.GET, handler: this.premium });
    this.addRoute({ path: '/:offerId', method: HttpMethod.GET, handler: this.show });
    this.addRoute({ path: '/:offerId', method: HttpMethod.PATCH, handler: this.update });
    this.addRoute({ path: '/:offerId', method: HttpMethod.DELETE, handler: this.remove });
  }

  public async index(
    { query: { limit, userId } }: TOfferListRequest,
    res: TResponse<Array<ShortOfferRdo>>,
  ): Promise<void> {
    const count = typeof limit === 'string' ? Number(limit) : undefined;

    if (limit !== undefined && (count === undefined || !Number.isSafeInteger(count) || count < 1)) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'limit must be a positive integer.');
    }

    const [offers, favoriteIds] = await Promise.all([this.offerService.find(count), this.getFavoriteIds(userId)]);
    this.ok(res, this.toShortOffers(offers, favoriteIds));
  }

  public async create({ body }: TCreateOfferRequest, res: TResponse<OfferRdo>): Promise<void> {
    const authorId = getObjectId(body.authorId, 'authorId');
    const author = await this.userService.findById(authorId);

    if (!author) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Offer author was not found.');
    }

    const offer = await this.offerService.create(body);
    await offer.populate('authorId');
    this.created(res, Object.assign(fillDTO(OfferRdo, offer), { isFavorite: false }));
  }

  public async premium({ params, query }: TPremiumOffersRequest, res: TResponse<Array<ShortOfferRdo>>): Promise<void> {
    if (!isAvailableCity(params.city)) {
      throw new HttpError(StatusCodes.BAD_REQUEST, 'Unknown city.');
    }

    const [offers, favoriteIds] = await Promise.all([
      this.offerService.findPremiumByCity(params.city),
      this.getFavoriteIds(query.userId),
    ]);
    this.ok(res, this.toShortOffers(offers, favoriteIds));
  }

  public async show({ params, query }: TOfferDetailsRequest, res: TResponse<OfferRdo>): Promise<void> {
    const offerId = getObjectId(params.offerId, 'offerId');
    const [offer, favoriteIds] = await Promise.all([
      this.offerService.findById(offerId),
      this.getFavoriteIds(query.userId),
    ]);

    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Offer was not found.');
    }

    this.ok(res, Object.assign(fillDTO(OfferRdo, offer), { isFavorite: favoriteIds.has(offer._id.toString()) }));
  }

  public async update({ params, query, body }: TUpdateOfferRequest, res: TResponse<OfferRdo>): Promise<void> {
    const offerId = getObjectId(params.offerId, 'offerId');
    const favoriteIds = await this.getFavoriteIds(query.userId);
    const dto = fillDTO(UpdateOfferDto, body);
    const offer = await this.offerService.updateById(offerId, { ...dto });

    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Offer was not found.');
    }

    this.ok(res, Object.assign(fillDTO(OfferRdo, offer), { isFavorite: favoriteIds.has(offer._id.toString()) }));
  }

  public async remove({ params }: TRemoveOfferRequest, res: TResponse<never>): Promise<void> {
    const offerId = getObjectId(params.offerId, 'offerId');

    if (!(await this.offerService.exists(offerId))) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Offer was not found.');
    }

    await this.commentService.deleteByOfferId(offerId);

    if (!(await this.offerService.deleteById(offerId))) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Offer was not found.');
    }

    this.noContent(res);
  }

  private async getFavoriteIds(value: unknown): Promise<Set<string>> {
    if (value === undefined) {
      return new Set();
    }

    const user = await this.userService.findById(getObjectId(value, 'userId'));
    return new Set(user?.favorites.map(String));
  }

  private toShortOffers(
    offers: Awaited<ReturnType<IOfferService['find']>>,
    favoriteIds: ReadonlySet<string>,
  ): Array<ShortOfferRdo> {
    return offers.map((offer) =>
      Object.assign(fillDTO(ShortOfferRdo, offer), { isFavorite: favoriteIds.has(offer._id.toString()) }),
    );
  }
}
