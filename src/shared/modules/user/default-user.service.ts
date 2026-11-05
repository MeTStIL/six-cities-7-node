import { IUserService } from './user-service.interface';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto';
import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { Component, TId } from '../../types';
import { ILogger } from '../../libs';

@injectable()
export class DefaultUserService implements IUserService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ) {}

  public create = async (dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> => {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  };

  public findByEmail = async (email: string): Promise<DocumentType<UserEntity> | null> =>
    this.userModel.findOne({ email });

  public findById = async (id: TId): Promise<DocumentType<UserEntity> | null> => this.userModel.findById(id);

  public findOrCreate = async (dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> => {
    const existedUser = await this.findByEmail(dto.email);

    return existedUser ?? (await this.create(dto, salt));
  };
}
