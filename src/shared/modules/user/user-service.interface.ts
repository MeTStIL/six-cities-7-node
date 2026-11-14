import { CreateUserDto } from './dto';
import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity';
import { TId } from '../../types';

export interface IUserService {
  create: (dto: CreateUserDto, salt: string) => Promise<DocumentType<UserEntity>>;
  findByEmail: (email: string) => Promise<DocumentType<UserEntity> | null>;
  findById: (id: TId) => Promise<DocumentType<UserEntity> | null>;
  findOrCreate: (dto: CreateUserDto, salt: string) => Promise<DocumentType<UserEntity>>;
}
