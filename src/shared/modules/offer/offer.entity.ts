import { defaultClasses, getModelForClass, modelOptions, prop, PropType, Ref } from '@typegoose/typegoose';
import { TAmenity, TCity, THousing, TLocation } from '../../types';
import { UserEntity } from '../user';
import { AVAILABLE_AMENITIES_SET } from '../../constants';

class Location {
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

  @prop({ required: true, type: () => Date, default: new Date() })
  public postDate!: Date;

  @prop({ required: true, type: () => String })
  public city?: TCity;

  @prop({ required: true, type: () => String })
  public previewImage!: string;

  @prop({ required: true, type: () => [String] }, PropType.ARRAY)
  public images!: string[];

  @prop({ required: true, type: () => Boolean })
  public isPremium!: boolean;

  @prop({ required: true, type: () => Boolean, default: false })
  public isFavorite!: boolean;

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

  @prop({ required: true, type: () => [String], enum: [...AVAILABLE_AMENITIES_SET] }, PropType.ARRAY)
  public amenities!: TAmenity[];

  @prop({
    required: true,
    ref: UserEntity,
  })
  public authorId!: Ref<UserEntity>;

  @prop({ required: true, default: 0, type: () => Number })
  public commentsCount!: number;

  @prop({ required: true, _id: false, type: () => Location })
  public location!: TLocation;
}

export const OfferModel = getModelForClass(OfferEntity);
