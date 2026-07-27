export interface Outfit {
  id: string;
  imageUri: string;
  date: string;
  createdAt: string;
}

export type OutfitInput = Pick<Outfit, 'imageUri' | 'date'>;
