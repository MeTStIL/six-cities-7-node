import { AVAILABLE_HOUSING_SET, THousing } from '../types';

export const isAvailableHousing = (housing: string): housing is THousing => AVAILABLE_HOUSING_SET.has(housing);
