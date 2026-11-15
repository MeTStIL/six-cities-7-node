import { Expose } from 'class-transformer';
import type { TUserStatus } from '../../../types';

export class UserRdo {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatar?: string;

  @Expose()
  public type!: TUserStatus;
}
