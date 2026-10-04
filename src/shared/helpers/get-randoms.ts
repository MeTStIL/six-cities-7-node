import { TAmenity, TCity, THousing } from '../types';
import { AVAILABLE_AMENITIES, AVAILABLE_CITIES, AVAILABLE_HOUSING } from '../constants';

export const getRandomInteger = (first: number, second: number): number => {
  const min = Math.min(first, second);
  const max = Math.max(first, second);

  return Math.floor(min + Math.random() * (max + 1 - min));
};

export const getRandomValue = (first: number, second: number, numAfterDigit = 0): number => {
  const min = Math.min(first, second);
  const max = Math.max(first, second);

  return +(Math.random() * (max - min) + min).toFixed(numAfterDigit);
};

export const getRandomElement = <T>(array: ReadonlyArray<T>): T => {
  if (array.length === 0) {
    throw new Error('Array is empty');
  }

  return array[getRandomInteger(0, array.length - 1)];
};

/**
 * Возвращает массив со случайным набором уникальных элементов из исходного массива в случайном порядке
 */
export const getRandomItems = <T>(array: ReadonlyArray<T>, maxElements?: number): Array<T> => {
  if (array.length === 0) {
    throw new Error('Array is empty');
  }

  const length = maxElements ?? getRandomInteger(1, array.length);

  return array
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, length);
};

export const getRandomBoolean = (): boolean => getRandomElement<boolean>([true, false]);

export const getRandomCity = (): TCity => getRandomElement(AVAILABLE_CITIES);
export const getRandomHousing = (): THousing => getRandomElement(AVAILABLE_HOUSING);
export const getRandomAmenity = (): TAmenity => getRandomElement(AVAILABLE_AMENITIES);
