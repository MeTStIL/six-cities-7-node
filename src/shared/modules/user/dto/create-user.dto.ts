import { TUser } from '../../../types';

export class CreateUserDto {
  public name!: string;
  public email!: string;
  public avatar?: string;
  public type!: TUser['type'];
  public password!: string;
}
