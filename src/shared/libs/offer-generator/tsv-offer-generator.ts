import { IOfferGenerator } from './offer-generator.interface';
import { IMockServerData, TRentalOffer } from '../../types';
import {
  getRandomInteger,
  getRandomCity,
  getRandomElement,
  getRandomValue,
  getRandomHousing,
  getRandomItems,
  getRandomBoolean,
} from '../../helpers';
import dayjs from 'dayjs';
import {
  AVAILABLE_AMENITIES,
  CITIES_LOCATION_CONFIG,
  GUESTS_CONFIG,
  PRICE_CONFIG,
  ROOMS_CONFIG,
  TABULATION_SYMBOL,
} from '../../constants';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TsvSBOfferGenerator implements IOfferGenerator {
  constructor(private readonly mockData: IMockServerData) {}

  private serializeOfferToTsv(offer: TRentalOffer): string {
    return [
      offer.title,
      offer.description,
      offer.postDate.toISOString(),
      offer.city,
      offer.previewImage,
      offer.images.join(TABULATION_SYMBOL),
      offer.isPremium,
      offer.isFavourite,
      offer.rating,
      offer.housingType,
      offer.rooms,
      offer.maxGuests,
      offer.price,
      offer.amenities.join(TABULATION_SYMBOL),
      offer.author.name,
      offer.author.email,
      offer.author.avatar,
      offer.author.password,
      offer.author.type,
      offer.commentsCount,
      offer.location.latitude,
      offer.location.longitude,
    ].join(TABULATION_SYMBOL);
  }

  public generate(): string {
    const city = getRandomCity();

    const offer: TRentalOffer = {
      title: getRandomElement(this.mockData.titles),
      description: getRandomElement(this.mockData.descriptions),
      postDate: dayjs().subtract(getRandomInteger(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toDate(),
      city,
      previewImage: getRandomElement(this.mockData.previewImages),
      images: getRandomElement(this.mockData.images).split(TABULATION_SYMBOL),
      isPremium: getRandomBoolean(),
      isFavourite: getRandomBoolean(),
      rating: getRandomValue(1.0, 5.0, 1),
      housingType: getRandomHousing(),
      rooms: getRandomInteger(ROOMS_CONFIG.min, ROOMS_CONFIG.max),
      maxGuests: getRandomInteger(GUESTS_CONFIG.min, GUESTS_CONFIG.max),
      price: getRandomValue(PRICE_CONFIG.min, PRICE_CONFIG.max),
      amenities: getRandomItems(AVAILABLE_AMENITIES),
      author: {
        name: getRandomElement(this.mockData.authors),
        email: getRandomElement(this.mockData.emails),
        avatar: getRandomElement(this.mockData.avatars),
        password: `qwerty${getRandomInteger(1, 1000)}`,
        type: getRandomBoolean() ? 'pro' : 'common',
      },
      commentsCount: getRandomInteger(0, 100),
      location: CITIES_LOCATION_CONFIG[city],
    };

    return this.serializeOfferToTsv(offer);
  }
}
