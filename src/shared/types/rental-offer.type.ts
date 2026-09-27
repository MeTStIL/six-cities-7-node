import { TAvailableCity } from './available-city.type.js';
import { THousing } from './housing.type.js';
import { TAvailableAmenities } from './available-amenities.type.js';
import { TUser } from './user.type.js';
import { TLocation } from './location.type.js';

export type TRentalOffer = {
  title: string;
  description: string;
  postDate: Date;
  city: TAvailableCity;
  previewImage: string;
  images: Array<string>;
  isPremium: boolean;
  isFavourite: boolean;
  rating: number;
  housingType: THousing;
  rooms: number;
  maxGuests: number;
  price: number;
  amenities: TAvailableAmenities;
  author: TUser;
  commentsCount: number;
  location: TLocation;
};
