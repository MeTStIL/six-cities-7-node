import { Container } from 'inversify';
import { ICommentService } from './comment-service.interface';
import { Component } from '../../types';
import { DefaultCommentService } from './default-comment.service';
import { types } from '@typegoose/typegoose';
import { CommentEntity, CommentModel } from './comment.entity';

export const createCommentContainer = (): Container => {
  const commentContainer = new Container();

  commentContainer.bind<ICommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

  return commentContainer;
};
