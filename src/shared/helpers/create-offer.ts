import { TRentalOffer } from '../types';
import { SUB_FIELD_SEPARATOR, TABULATION_SYMBOL } from '../constants';
import { isAvailableAmenity, isAvailableCity, isAvailableHousing, isAvailableUserStatus } from '../guards';
import { parseBooleanFromString } from './parse-boolean';

export const createOffer = (offerData: string): TRentalOffer => {
  const [
    title,
    description,
    postDate,
    city,
    previewImage,
    images,
    isPremium,
    isFavourite,
    rating,
    housingType,
    rooms,
    maxGuests,
    price,
    amenities,
    authorName,
    authorEmail,
    authorAvatar,
    authorPassword,
    authorStatus,
    commentsCount,
    latitude,
    longitude,
  ] = offerData.replace('\n', '').split(TABULATION_SYMBOL);

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: isAvailableCity(city) ? city : undefined,
    previewImage,
    images: images.split(SUB_FIELD_SEPARATOR),
    isPremium: parseBooleanFromString(isPremium),
    isFavourite: parseBooleanFromString(isFavourite),
    rating: parseFloat(rating),
    housingType: isAvailableHousing(housingType) ? housingType : undefined,
    rooms: parseInt(rooms, 10),
    maxGuests: parseInt(maxGuests, 10),
    price: parseInt(price, 10),
    amenities: amenities.split(SUB_FIELD_SEPARATOR).map((item) => (isAvailableAmenity(item) ? item : undefined)),
    author: {
      name: authorName,
      email: authorEmail,
      avatar: authorAvatar,
      password: authorPassword,
      type: isAvailableUserStatus(authorStatus) ? authorStatus : undefined,
    },
    commentsCount: parseInt(commentsCount, 10),
    location: {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    },
  };
};
