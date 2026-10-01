import { AVAILABLE_CITIES_SET, TAvailableCity } from '../types/index.js';

export const isAvailableCity = (city: string): city is TAvailableCity => AVAILABLE_CITIES_SET.has(city);
