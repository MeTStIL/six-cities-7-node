import { TUserStatus } from '../types';
import { AVAILABLE_USER_STATUSES_SET } from '../constants';

export const isAvailableUserStatus = (status: string): status is TUserStatus => AVAILABLE_USER_STATUSES_SET.has(status);
