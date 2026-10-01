import { TAvailableCity } from './available-city.type.js';
import { THousing } from './housing.type.js';
import { TAmenity } from './available-amenities.type.js';
import { TUser } from './user.type.js';
import { TLocation } from './location.type.js';

export type TRentalOffer = {
  title: string;
  description: string;
  postDate: Date;
  city: TAvailableCity | undefined;
  previewImage: string;
  images: Array<string>;
  isPremium: boolean;
  isFavourite: boolean;
  rating: number;
  housingType: THousing | undefined;
  rooms: number;
  maxGuests: number;
  price: number;
  amenities: Array<TAmenity | undefined>;
  author: TUser;
  commentsCount: number;
  location: TLocation;
};
