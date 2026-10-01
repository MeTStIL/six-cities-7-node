export const AVAILABLE_AMENITIES = [
  'Breakfast',
  'Air conditioning',
  'Laptop friendly workspace',
  'Baby seat',
  'Washer',
  'Towels',
  'Fridge',
] as const;

export const AVAILABLE_AMENITIES_SET: ReadonlySet<string> = new Set<string>(AVAILABLE_AMENITIES);

export type TAmenity = (typeof AVAILABLE_AMENITIES)[number];
