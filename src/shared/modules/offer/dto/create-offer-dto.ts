import { TAmenity, TCity, THousing, TLocation } from '../../../types';

export class CreateOfferDto {
  public title!: string;
  public description!: string;
  public city!: TCity;
  public previewImage!: string;
  public images!: Array<string>;
  public isPremium!: boolean;
  public housingType!: THousing;
  public rooms!: number;
  public maxGuests!: number;
  public price!: number;
  public amenities!: Array<TAmenity>;
  public authorId!: string;
  public location!: TLocation;
}
