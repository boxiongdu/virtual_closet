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

export type ClothingSource =
  | {
      type: 'photo';
    }
  | {
      type: 'url';
      url: string;
    }
  | {
      type: 'taobao';
      originalUrl: string;
      resolvedUrl?: string;
    };

export type ClothingItem = {
  id: string;
  name: string;
  imageUri?: string;
  placeholderTone: PlaceholderTone;
  category: ClothingCategory;
  color: string;
  brand?: string;
  purchaseDate?: string;
  notes?: string;
  source: ClothingSource;
  archived: boolean;
};

export type ClothingInput = Partial<Pick<ClothingItem, 'name'>> &
  Pick<
    ClothingItem,
    | 'imageUri'
    | 'placeholderTone'
    | 'category'
    | 'color'
    | 'brand'
    | 'purchaseDate'
    | 'notes'
    | 'source'
  >;
