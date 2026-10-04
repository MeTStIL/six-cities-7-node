import { TAmenity, TCity, THousing } from '../types';
import { AVAILABLE_AMENITIES, AVAILABLE_CITIES, AVAILABLE_HOUSING } from '../constants';

export const generateRandomValue = (min: number, max: number, numAfterDigit = 0): number =>
  +(Math.random() * (max - min) + min).toFixed(numAfterDigit);

export const getRandomElement = <T>(array: ReadonlyArray<T>): T | undefined => {
  if (array.length === 0) {
    return undefined;
  }

  return array[generateRandomValue(0, array.length)];
};

export const getRandomCity = (): TCity => getRandomElement(AVAILABLE_CITIES)!;
export const getRandomHousing = (): THousing => getRandomElement(AVAILABLE_HOUSING)!;
export const getRandomAmenity = (): TAmenity => getRandomElement(AVAILABLE_AMENITIES)!;
