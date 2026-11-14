import { CreateCommentDto } from './dto';
import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity';
import { TId } from '../../types';

type TDocumentCommentEntity = DocumentType<CommentEntity>;

export interface ICommentService {
  create: (dto: CreateCommentDto) => Promise<TDocumentCommentEntity>;
  findByOfferId: (offerId: TId, limit?: number) => Promise<Array<TDocumentCommentEntity>>;
  deleteByOfferId: (offerId: TId) => Promise<number>;
}
