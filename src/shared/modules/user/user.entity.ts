import { TUser } from '../../types';
import { prop, defaultClasses, modelOptions, getModelForClass, Ref, PropType } from '@typegoose/typegoose';
import { USER_CONFIG } from '../../constants';
import { createSHA256 } from '../../helpers';
import type { OfferEntity } from '../offer/offer.entity';

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({ schemaOptions: { collection: 'users' } })
export class UserEntity extends defaultClasses.TimeStamps implements TUser {
  @prop({ required: true, minlength: USER_CONFIG.name.min, maxlength: USER_CONFIG.name.max, type: () => String })
  public name: string;

  @prop({ required: true, unique: true, type: () => String })
  public email: string;

  @prop({ required: false, default: '', type: () => String })
  public avatar?: string;

  @prop({
    required: true,
    type: () => String,
  })
  private password?: string;

  @prop({ required: true, type: () => String })
  public type: TUser['type'];

  @prop(
    {
      ref: 'OfferEntity',
      default: [],
    },
    PropType.ARRAY,
  )
  public favorites!: Ref<OfferEntity>[];

  constructor(userData: TUser) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.type = userData.type;
    this.favorites = [];
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
