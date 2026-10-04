import { TAvailableCity } from './available-city.type';
import { THousing } from './housing.type';
import { TAmenity } from './available-amenities.type';
import { TUser } from './user.type';
import { TLocation } from './location.type';

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
