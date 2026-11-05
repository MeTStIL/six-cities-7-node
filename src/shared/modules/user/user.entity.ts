import { TUser } from '../../types';
import { prop, defaultClasses, modelOptions, getModelForClass } from '@typegoose/typegoose';
import { USER_CONFIG } from '../../constants';
import { createSHA256 } from '../../helpers';

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
    minlength: USER_CONFIG.password.min,
    maxlength: USER_CONFIG.password.max,
    type: () => String,
  })
  private password?: string;

  @prop({ required: true, type: () => String })
  public type: TUser['type'];

  constructor(userData: TUser) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
