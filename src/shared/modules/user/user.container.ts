import { Container } from 'inversify';
import { IUserService } from './user-service.interface';
import { Component } from '../../types';
import { DefaultUserService } from './default-user.service';
import { types } from '@typegoose/typegoose';
import { UserEntity, UserModel } from './user.entity';
import { IController } from '../../libs';
import { UserController } from './user.controller';

export const createUserContainer = (): Container => {
  const userContainer = new Container();

  userContainer.bind<IUserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  userContainer.bind<IController>(Component.UserController).to(UserController).inSingletonScope();

  return userContainer;
};
