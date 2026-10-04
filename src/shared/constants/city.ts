export const AVAILABLE_CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
export const AVAILABLE_CITIES_SET: ReadonlySet<string> = new Set<string>(AVAILABLE_CITIES);
