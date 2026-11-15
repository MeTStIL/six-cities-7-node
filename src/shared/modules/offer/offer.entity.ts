import { defaultClasses, getModelForClass, modelOptions, prop, PropType, type Ref } from '@typegoose/typegoose';
import type { TAmenity, TCity, THousing, TLocation } from '../../types';
import { UserEntity } from '../user';

class LocationEntity {
  @prop({ required: true, type: () => Number })
  public latitude!: number;

  @prop({ required: true, type: () => Number })
  public longitude!: number;
}

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({ schemaOptions: { collection: 'offers' } })
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, type: () => String })
  public title!: string;

  @prop({ required: true, type: () => String })
  public description!: string;

  @prop({ required: true, type: () => Date, default: Date.now })
  public postDate!: Date;

  @prop({ required: true, type: () => String })
  public city?: TCity;

  @prop({ required: true, type: () => String })
  public previewImage!: string;

  @prop({ required: true, type: () => [String] }, PropType.ARRAY)
  public images!: Array<string>;

  @prop({ required: true, type: () => Boolean })
  public isPremium!: boolean;

  @prop({ required: true, default: 0, type: () => Number })
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
  })
  public housingType?: THousing;

  @prop({ required: true, type: () => Number })
  public rooms!: number;

  @prop({ required: true, type: () => Number })
  public maxGuests!: number;

  @prop({ required: true, type: () => Number })
  public price!: number;

  @prop({ required: true, type: () => [String] }, PropType.ARRAY)
  public amenities!: Array<TAmenity>;

  @prop({
    required: true,
    ref: UserEntity,
  })
  public authorId!: Ref<UserEntity>;

  @prop({ required: true, default: 0, type: () => Number })
  public commentsCount!: number;

  @prop({ required: true, _id: false, type: () => LocationEntity })
  public location!: TLocation;
}

export const OfferModel = getModelForClass(OfferEntity);
