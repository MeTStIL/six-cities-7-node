import { Expose } from 'class-transformer';
import type { TAmenity, TCity, THousing, TLocation } from '../../../types';

export class UpdateOfferDto {
  @Expose()
  public title?: string;

  @Expose()
  public description?: string;

  @Expose()
  public city?: TCity;

  @Expose()
  public previewImage?: string;

  @Expose()
  public images?: Array<string>;

  @Expose()
  public isPremium?: boolean;

  @Expose()
  public housingType?: THousing;

  @Expose()
  public rooms?: number;

  @Expose()
  public maxGuests?: number;

  @Expose()
  public price?: number;

  @Expose()
  public amenities?: Array<TAmenity>;

  @Expose()
  public location?: TLocation;
}
