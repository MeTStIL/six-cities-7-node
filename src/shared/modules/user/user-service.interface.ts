import { CreateUserDto } from './dto';
import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity';
import { TId } from '../../types';

type TDocumentUserEntity = DocumentType<UserEntity>;

export interface IUserService {
  create: (dto: CreateUserDto, salt: string) => Promise<TDocumentUserEntity>;
  findByEmail: (email: string) => Promise<TDocumentUserEntity | null>;
  findById: (userId: TId) => Promise<TDocumentUserEntity | null>;
  findOrCreate: (dto: CreateUserDto, salt: string) => Promise<TDocumentUserEntity>;
  addToFavorites: (userId: TId, offerId: TId) => Promise<TDocumentUserEntity | null>;
  removeFromFavorites: (userId: TId, offerId: TId) => Promise<TDocumentUserEntity | null>;
}
