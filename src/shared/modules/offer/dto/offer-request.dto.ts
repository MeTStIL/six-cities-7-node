export class OfferIdParamsDto {
  public offerId!: string;
}

export class PremiumOfferParamsDto {
  public city!: string;
}

export class OfferViewerQueryDto {
  public userId?: string;
}

export class OfferListQueryDto extends OfferViewerQueryDto {
  public limit?: string;
}

export class FavoriteQueryDto {
  public userId!: string;
}
