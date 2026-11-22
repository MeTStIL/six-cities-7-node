import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { fillDTO, getObjectId } from '../../helpers';
import { BaseController, HttpError, HttpMethod, type ILogger, type TResponse } from '../../libs';
import { Component } from '../../types';
import type { IUserService } from '../user';
import type { IOfferService } from './offer-service.interface';
import type { TFavoriteListRequest, TFavoriteOfferRequest } from './offer-requests.type';
import { OfferRdo, ShortOfferRdo } from './rdo';

@injectable()
export class FavoriteController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
    @inject(Component.UserService) private readonly userService: IUserService,
  ) {
    super(logger);

    this.logger.info('Register routes for FavoriteController...');

    this.addRoute({ path: '/', method: HttpMethod.GET, handler: this.index });
    this.addRoute({ path: '/:offerId', method: HttpMethod.POST, handler: this.add });
    this.addRoute({ path: '/:offerId', method: HttpMethod.DELETE, handler: this.remove });
  }

  public async index({ query }: TFavoriteListRequest, res: TResponse<Array<ShortOfferRdo>>): Promise<void> {
    const user = await this.userService.findById(getObjectId(query.userId, 'userId'));
    if (!user) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'User was not found.');
    }

    const offers = await this.offerService.findManyByIds(user.favorites.map(String));
    this.ok(
      res,
      offers.map((offer) => ({ ...fillDTO(ShortOfferRdo, offer), isFavorite: true })),
    );
  }

  public add(req: TFavoriteOfferRequest, res: TResponse<OfferRdo>): Promise<void> {
    return this.updateFavorite(req, res, true);
  }

  public remove(req: TFavoriteOfferRequest, res: TResponse<OfferRdo>): Promise<void> {
    return this.updateFavorite(req, res, false);
  }

  private async updateFavorite(
    { params, query }: TFavoriteOfferRequest,
    res: TResponse<OfferRdo>,
    isFavorite: boolean,
  ): Promise<void> {
    const userId = getObjectId(query.userId, 'userId');
    const offerId = getObjectId(params.offerId, 'offerId');
    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Offer was not found.');
    }

    const user = isFavorite
      ? await this.userService.addToFavorites(userId, offerId)
      : await this.userService.removeFromFavorites(userId, offerId);

    if (!user) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'User was not found.');
    }

    this.ok(res, { ...fillDTO(OfferRdo, offer), isFavorite });
  }
}
