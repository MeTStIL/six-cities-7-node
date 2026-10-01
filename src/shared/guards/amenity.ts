import { AVAILABLE_AMENITIES_SET, TAmenity } from '../types/index.js';

export const isAvailableAmenity = (amenity: string): amenity is TAmenity => AVAILABLE_AMENITIES_SET.has(amenity);
