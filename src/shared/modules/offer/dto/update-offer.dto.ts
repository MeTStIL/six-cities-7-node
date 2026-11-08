import { TAmenity, TCity, THousing, TLocation } from '../../../types';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public city?: TCity;
  public previewImage?: string;
  public images?: Array<string>;
  public isPremium?: boolean;
  public housingType?: THousing;
  public rooms?: number;
  public maxGuests?: number;
  public price?: number;
  public amenities?: Array<TAmenity>;
  public location?: TLocation;
}
