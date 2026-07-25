export const clothingCategories = [
  'top',
  'bottom',
  'outerwear',
  'one_piece',
  'shoes',
  'accessory',
] as const;

export type ClothingCategory = (typeof clothingCategories)[number];

export const placeholderTones = ['stone', 'taupe', 'ink', 'clay'] as const;

export type PlaceholderTone = (typeof placeholderTones)[number];

export type ClothingItem = {
  id: string;
  name: string;
  imageUri?: string;
  placeholderTone: PlaceholderTone;
  category: ClothingCategory;
  color: string;
  brand?: string;
  sourceUrl?: string;
  archived: boolean;
};

export type ClothingInput = Pick<
  ClothingItem,
  | 'imageUri'
  | 'placeholderTone'
  | 'category'
  | 'color'
  | 'brand'
  | 'sourceUrl'
>;
