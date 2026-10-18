import { THousing } from '../types';
import { AVAILABLE_HOUSING_SET } from '../constants';

export const isAvailableHousing = (housing: string): housing is THousing => AVAILABLE_HOUSING_SET.has(housing);
