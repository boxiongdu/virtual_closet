import { Platform } from 'react-native';

// React Native Web's image picker can return a data URL. Embedding that image
// in an Expo Router parameter creates an enormous browser URL. Keep only a
// short-lived reference in navigation and the photo in memory until saved.
const staged = new Map<string, string>();
let sequence = 0;
const maxStagedImages = 4;
const imageKeyPrefix = 'staged-photo-';

export function stageImageForNavigation(uri: string): string {
  if (Platform.OS !== 'web') {
    return uri;
  }

  const token = `${imageKeyPrefix}${++sequence}`;
  staged.set(token, uri);

  if (staged.size > maxStagedImages) {
    const oldest = staged.keys().next().value;
    if (oldest !== undefined) {
      staged.delete(oldest);
    }
  }

  return token;
}

export function resolveImageFromNavigation(value?: string): string | undefined {
  if (!value) return undefined;
  if (Platform.OS !== 'web' || !value.startsWith(imageKeyPrefix)) {
    return value;
  }
  return staged.get(value);
}
