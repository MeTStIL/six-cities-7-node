import { TId } from '../../../types';

export class CreateCommentDto {
  public text!: string;
  public rating!: number;
  public authorId!: TId;
  public offerId!: TId;
}
