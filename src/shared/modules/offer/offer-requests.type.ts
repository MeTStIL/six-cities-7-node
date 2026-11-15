import type { TRequest, TRequestParams } from '../../libs';
import type {
  CreateOfferDto,
  FavoriteQueryDto,
  OfferIdParamsDto,
  OfferListQueryDto,
  OfferViewerQueryDto,
  PremiumOfferParamsDto,
  UpdateOfferDto,
} from './dto';
import type { OfferRdo, ShortOfferRdo } from './rdo';

export type TOfferListRequest = TRequest<TRequestParams, Array<ShortOfferRdo>, unknown, OfferListQueryDto>;
export type TCreateOfferRequest = TRequest<TRequestParams, OfferRdo, CreateOfferDto>;
export type TPremiumOffersRequest = TRequest<PremiumOfferParamsDto, Array<ShortOfferRdo>, unknown, OfferViewerQueryDto>;
export type TOfferDetailsRequest = TRequest<OfferIdParamsDto, OfferRdo, unknown, OfferViewerQueryDto>;
export type TUpdateOfferRequest = TRequest<OfferIdParamsDto, OfferRdo, UpdateOfferDto, OfferViewerQueryDto>;
export type TRemoveOfferRequest = TRequest<OfferIdParamsDto, never>;

export type TFavoriteListRequest = TRequest<TRequestParams, Array<ShortOfferRdo>, unknown, FavoriteQueryDto>;
export type TFavoriteOfferRequest = TRequest<OfferIdParamsDto, OfferRdo, unknown, FavoriteQueryDto>;
