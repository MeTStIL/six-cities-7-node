import { IUserService } from './user-service.interface';
import { UserEntity } from './user.entity';
import { types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Component } from '../../types';
import { ILogger } from '../../libs';

@injectable()
export class DefaultUserService implements IUserService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ) {}

  public create: IUserService['create'] = async (dto, salt) => {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  };

  public findByEmail: IUserService['findByEmail'] = async (email) => this.userModel.findOne({ email });

  public findById: IUserService['findById'] = async (userId) => this.userModel.findById(userId);

  public findOrCreate: IUserService['findOrCreate'] = async (dto, salt) => {
    const existedUser = await this.findByEmail(dto.email);

    return existedUser ?? (await this.create(dto, salt));
  };

  public addToFavorites: IUserService['addToFavorites'] = async (userId, offerId) =>
    this.userModel.findByIdAndUpdate(userId, { $addToSet: { favorites: offerId } }, { new: true }).exec();

  public removeFromFavorites: IUserService['removeFromFavorites'] = async (userId, offerId) =>
    this.userModel.findByIdAndUpdate(userId, { $pull: { favorites: offerId } }, { new: true }).exec();
}
