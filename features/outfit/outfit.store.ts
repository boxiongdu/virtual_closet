import { useSyncExternalStore } from 'react';

import type { Outfit } from './outfit.types';

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function dateBeforeToday(daysAgo: number) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() - daysAgo);
  return date;
}

const initialOutfits: Outfit[] = [
  {
    id: 'look-01',
    imageUri: 'placeholder://ink',
    date: toDateKey(dateBeforeToday(0)),
    caption: 'Today',
    createdAt: dateBeforeToday(0).toISOString(),
  },
  {
    id: 'look-02',
    imageUri: 'placeholder://clay',
    date: toDateKey(dateBeforeToday(3)),
    caption: 'A quiet afternoon',
    createdAt: dateBeforeToday(3).toISOString(),
  },
  {
    id: 'look-03',
    imageUri: 'placeholder://taupe',
    date: toDateKey(dateBeforeToday(8)),
    createdAt: dateBeforeToday(8).toISOString(),
  },
];

let outfits = initialOutfits;
let nextId = initialOutfits.length + 1;
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return outfits;
}

export function addOutfit(input: Omit<Outfit, 'id' | 'createdAt'>) {
  const outfit: Outfit = {
    ...input,
    id: `look-${String(nextId++).padStart(2, '0')}`,
    createdAt: new Date().toISOString(),
  };

  outfits = [outfit, ...outfits];
  emitChange();
  return outfit;
}

export function getOutfitById(id: string) {
  return outfits.find((outfit) => outfit.id === id);
}

export function useOutfits() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function useOutfit(id: string) {
  const outfitItems = useOutfits();
  return outfitItems.find((outfit) => outfit.id === id);
}
