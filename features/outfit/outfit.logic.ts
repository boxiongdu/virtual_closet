import type { Outfit } from './outfit.types';

export function upsertOutfitByDate(outfits: Outfit[], outfit: Outfit) {
  return [
    outfit,
    ...outfits.filter((item) => item.date !== outfit.date),
  ].sort((left, right) => left.date.localeCompare(right.date));
}

export function getLookNumber(outfits: Outfit[], outfitId: string) {
  const orderedOutfits = [...outfits].sort((left, right) => {
    const dateOrder = left.date.localeCompare(right.date);
    return dateOrder || left.id.localeCompare(right.id);
  });
  const index = orderedOutfits.findIndex((outfit) => outfit.id === outfitId);

  return index >= 0 ? index + 1 : undefined;
}
