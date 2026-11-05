import { IAppConfigProps } from '../types';

export const AVAILABLE_USER_STATUSES = ['common', 'pro'] as const;
export const AVAILABLE_USER_STATUSES_SET: ReadonlySet<string> = new Set(AVAILABLE_USER_STATUSES);

export const USER_CONFIG = {
  name: {
    min: 1,
    max: 15,
  },
  password: {
    min: 6,
    max: 12,
  },
} as const satisfies Record<string, IAppConfigProps>;
