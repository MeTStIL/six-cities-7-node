import { IFileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { TRentalOffer, TUserStatus } from '../../types/index.js';
import { SUB_FIELD_SEPARATOR } from '../../constants/index.js';
import { parseBooleanFromString } from '../../helpers/index.js';
import { isAvailableAmenity, isAvailableCity, isAvailableHousing } from '../../guards/index.js';

export class TsvFileReader implements IFileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Array<TRentalOffer> {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(
        ([
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
          authorType,
          commentsCount,
          latitude,
          longitude,
        ]) => ({
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
            type: authorType as TUserStatus,
          },
          commentsCount: parseInt(commentsCount, 10),
          location: {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          },
        }),
      );
  }
}
