import { AVAILABLE_AMENITIES_SET, TAmenity } from '../types';

export const isAvailableAmenity = (amenity: string): amenity is TAmenity => AVAILABLE_AMENITIES_SET.has(amenity);
