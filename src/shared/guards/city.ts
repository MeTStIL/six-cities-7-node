import { TCity } from '../types';
import { AVAILABLE_CITIES_SET } from '../constants';

export const isAvailableCity = (city: string): city is TCity => AVAILABLE_CITIES_SET.has(city);
