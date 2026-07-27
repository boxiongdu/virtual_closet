import AsyncStorage from '@react-native-async-storage/async-storage';
import { Directory, File, Paths } from 'expo-file-system';
import { useEffect, useSyncExternalStore } from 'react';

import { upsertOutfitByDate } from './outfit.logic';
import type { Outfit, OutfitInput } from './outfit.types';

const storageKey = '@virtual-closet/outfits';
const releaseCleanupKey = '@virtual-closet/release-v0.3-outfits-cleared';
const outfitDirectory = new Directory(Paths.document, 'outfits');

type OutfitSnapshot = {
  outfits: Outfit[];
  isHydrated: boolean;
};

let snapshot: OutfitSnapshot = {
  outfits: [],
  isHydrated: false,
};
let hydrationPromise: Promise<void> | undefined;
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}

function isOutfit(value: unknown): value is Outfit {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.imageUri === 'string' &&
    !candidate.imageUri.startsWith('placeholder://') &&
    typeof candidate.date === 'string' &&
    typeof candidate.createdAt === 'string'
  );
}

async function clearPreReleaseOutfitsOnce() {
  const hasCleared = await AsyncStorage.getItem(releaseCleanupKey);
  if (hasCleared === 'true') {
    return;
  }

  await AsyncStorage.removeItem(storageKey);

  if (outfitDirectory.exists) {
    try {
      outfitDirectory.delete();
    } catch {
      // Metadata is cleared even if an old managed image cannot be removed.
    }
  }

  await AsyncStorage.setItem(releaseCleanupKey, 'true');
}

export function hydrateOutfits() {
  if (snapshot.isHydrated) {
    return Promise.resolve();
  }

  if (!hydrationPromise) {
    hydrationPromise = clearPreReleaseOutfitsOnce()
      .then(() => AsyncStorage.getItem(storageKey))
      .then((value) => {
        const parsed: unknown = value ? JSON.parse(value) : [];
        const outfits = Array.isArray(parsed) ? parsed.filter(isOutfit) : [];

        snapshot = {
          outfits,
          isHydrated: true,
        };
        emitChange();
      })
      .catch(() => {
        snapshot = {
          outfits: [],
          isHydrated: true,
        };
        emitChange();
      });
  }

  return hydrationPromise;
}

function persistImage(sourceUri: string, date: string) {
  outfitDirectory.create({ idempotent: true, intermediates: true });

  const source = new File(sourceUri);
  const extension = source.extension || '.jpg';
  const destination = new File(
    outfitDirectory,
    `${date}-${Date.now()}${extension}`,
  );

  source.copy(destination);
  return destination;
}

function deleteManagedImage(imageUri: string) {
  if (!imageUri.startsWith(outfitDirectory.uri)) {
    return;
  }

  const image = new File(imageUri);
  if (image.exists) {
    try {
      image.delete();
    } catch {
      // The new outfit is already saved; an orphaned old image is non-fatal.
    }
  }
}

export async function saveOutfit(input: OutfitInput) {
  await hydrateOutfits();

  const existingOutfit = snapshot.outfits.find(
    (outfit) => outfit.date === input.date,
  );
  const persistedImage = persistImage(input.imageUri, input.date);
  const outfit: Outfit = {
    id: existingOutfit?.id ?? `look-${input.date}`,
    imageUri: persistedImage.uri,
    date: input.date,
    createdAt: existingOutfit?.createdAt ?? new Date().toISOString(),
  };
  const nextOutfits = upsertOutfitByDate(snapshot.outfits, outfit);

  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(nextOutfits));
  } catch (error) {
    persistedImage.delete();
    throw error;
  }

  snapshot = {
    outfits: nextOutfits,
    isHydrated: true,
  };
  emitChange();

  if (
    existingOutfit &&
    existingOutfit.imageUri !== persistedImage.uri
  ) {
    deleteManagedImage(existingOutfit.imageUri);
  }

  return outfit;
}

export function getOutfitById(id: string) {
  return snapshot.outfits.find((outfit) => outfit.id === id);
}

export async function resetOutfits() {
  await hydrateOutfits();
  await AsyncStorage.removeItem(storageKey);
  snapshot.outfits.forEach((outfit) => deleteManagedImage(outfit.imageUri));
  snapshot = {
    outfits: [],
    isHydrated: true,
  };
  emitChange();
}

export function useOutfitStore() {
  const storeSnapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getSnapshot,
  );

  useEffect(() => {
    void hydrateOutfits();
  }, []);

  return storeSnapshot;
}

export function useOutfits() {
  return useOutfitStore().outfits;
}

export function useOutfit(id: string) {
  const outfitItems = useOutfits();
  return outfitItems.find((outfit) => outfit.id === id);
}
