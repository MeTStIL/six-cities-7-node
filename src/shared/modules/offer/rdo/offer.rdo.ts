import { Expose, Type } from 'class-transformer';
import type { TAmenity, TCity, THousing } from '../../../types';
import { UserRdo } from '../../user';

class LocationRdo {
  @Expose()
  public latitude!: number;

  @Expose()
  public longitude!: number;
}

export class ShortOfferRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public postDate!: Date;

  @Expose()
  public city!: TCity;

  @Expose()
  public previewImage!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public housingType!: THousing;

  @Expose()
  public price!: number;

  @Expose()
  public commentsCount!: number;
}

export class OfferRdo extends ShortOfferRdo {
  @Expose()
  public description!: string;

  @Expose()
  public images!: Array<string>;

  @Expose()
  public rooms!: number;

  @Expose()
  public maxGuests!: number;

  @Expose()
  public amenities!: Array<TAmenity>;

  @Expose({ name: 'authorId' })
  @Type(() => UserRdo)
  public author!: UserRdo;

  @Expose()
  @Type(() => LocationRdo)
  public location!: LocationRdo;
}
