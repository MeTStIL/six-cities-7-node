export const AVAILABLE_CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

export type TAvailableCity = (typeof AVAILABLE_CITIES)[number];

export const AVAILABLE_CITIES_SET: ReadonlySet<string> = new Set<TAvailableCity>(AVAILABLE_CITIES);
