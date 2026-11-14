import { AVAILABLE_USER_STATUSES } from '../constants';

export type TUserStatus = (typeof AVAILABLE_USER_STATUSES)[number];

export type TUser = {
  name: string;
  email: string;
  avatar?: string;
  type: TUserStatus | undefined;
};
