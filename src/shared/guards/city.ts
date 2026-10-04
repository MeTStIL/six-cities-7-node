import { AVAILABLE_CITIES_SET, TAvailableCity } from '../types';

export const isAvailableCity = (city: string): city is TAvailableCity => AVAILABLE_CITIES_SET.has(city);
