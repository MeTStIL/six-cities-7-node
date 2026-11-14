import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import type { UserEntity } from '../user/user.entity';
import type { OfferEntity } from '../offer/offer.entity';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({ schemaOptions: { collection: 'comments' } })
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, trim: true, type: () => String })
  public text!: string;

  @prop({ required: true, type: () => Number })
  public rating!: number;

  @prop({
    required: true,
    ref: 'UserEntity',
  })
  public authorId!: Ref<UserEntity>;

  @prop({
    required: true,
    ref: 'OfferEntity',
  })
  public offerId!: Ref<OfferEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
