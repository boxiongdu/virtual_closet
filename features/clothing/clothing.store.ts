import { useSyncExternalStore } from 'react';

import type {
  ClothingInput,
  ClothingItem,
} from './clothing.types';

const initialItems: ClothingItem[] = [
  {
    id: '01',
    name: 'Essential Shirt',
    placeholderTone: 'stone',
    category: 'top',
    color: 'Ivory',
    archived: false,
  },
  {
    id: '02',
    name: 'Wool Overshirt',
    placeholderTone: 'taupe',
    category: 'outerwear',
    color: 'Taupe',
    archived: false,
  },
  {
    id: '03',
    name: 'Wide-Leg Trouser',
    placeholderTone: 'ink',
    category: 'bottom',
    color: 'Black',
    archived: false,
  },
  {
    id: '04',
    name: 'Everyday Knit',
    placeholderTone: 'clay',
    category: 'top',
    color: 'Clay',
    archived: false,
  },
  {
    id: '05',
    name: 'Long Coat',
    placeholderTone: 'taupe',
    category: 'outerwear',
    color: 'Camel',
    archived: false,
  },
  {
    id: '06',
    name: 'Leather Loafer',
    placeholderTone: 'ink',
    category: 'shoes',
    color: 'Black',
    archived: false,
  },
];

let items = initialItems;
let nextId = initialItems.length + 1;
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return items;
}

function createName(input: ClothingInput) {
  const categoryName = input.category.replace('_', ' ');
  const descriptor = input.brand?.trim() || input.color.trim();

  return `${descriptor} ${categoryName}`.replace(/\b\w/g, (letter) =>
    letter.toUpperCase(),
  );
}

export function addClothing(input: ClothingInput) {
  const item: ClothingItem = {
    ...input,
    brand: input.brand?.trim() || undefined,
    color: input.color.trim(),
    id: String(nextId++).padStart(2, '0'),
    imageUri: input.imageUri?.trim() || undefined,
    name: createName(input),
    sourceUrl: input.sourceUrl?.trim() || undefined,
    archived: false,
  };

  items = [item, ...items];
  emitChange();
  return item;
}

export function updateClothing(id: string, input: ClothingInput) {
  let updatedItem: ClothingItem | undefined;

  items = items.map((item) => {
    if (item.id !== id) {
      return item;
    }

    updatedItem = {
      ...item,
      ...input,
      brand: input.brand?.trim() || undefined,
      color: input.color.trim(),
      imageUri: input.imageUri?.trim() || undefined,
      name: createName(input),
      sourceUrl: input.sourceUrl?.trim() || undefined,
    };

    return updatedItem;
  });

  if (updatedItem) {
    emitChange();
  }

  return updatedItem;
}

export function archiveClothing(id: string) {
  const item = items.find((candidate) => candidate.id === id);

  if (!item) {
    return false;
  }

  items = items.map((candidate) =>
    candidate.id === id ? { ...candidate, archived: true } : candidate,
  );
  emitChange();
  return true;
}

export function deleteClothing(id: string) {
  const nextItems = items.filter((item) => item.id !== id);

  if (nextItems.length === items.length) {
    return false;
  }

  items = nextItems;
  emitChange();
  return true;
}

export function getClothingById(id: string) {
  return items.find((item) => item.id === id);
}

export function useClothingItems() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function useClothingItem(id: string) {
  const clothingItems = useClothingItems();
  return clothingItems.find((item) => item.id === id);
}
