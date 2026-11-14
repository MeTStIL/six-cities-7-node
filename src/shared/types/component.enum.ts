export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  // User
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
  // Offer
  OfferService: Symbol.for('OfferService'),
  OfferModel: Symbol.for('OfferModel'),
  // Comment
  CommentService: Symbol.for('CommentService'),
  CommentModel: Symbol.for('CommentModel'),
} as const;
