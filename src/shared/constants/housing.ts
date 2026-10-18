export const AVAILABLE_HOUSING = ['apartment', 'house', 'room', 'hotel'] as const;
export const AVAILABLE_HOUSING_SET: ReadonlySet<string> = new Set<string>(AVAILABLE_HOUSING);
