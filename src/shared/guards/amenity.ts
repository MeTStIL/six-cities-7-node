import { TAmenity } from '../types';
import { AVAILABLE_AMENITIES_SET } from '../constants';

export const isAvailableAmenity = (amenity: string): amenity is TAmenity => AVAILABLE_AMENITIES_SET.has(amenity);
