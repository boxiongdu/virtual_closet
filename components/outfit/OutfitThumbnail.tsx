import { Image, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import type { Outfit } from '../../features/outfit/outfit.types';
import { colors, radii } from '../../lib/theme';

type OutfitThumbnailProps = {
  outfit: Outfit;
  compact?: boolean;
  archive?: boolean;
};

export function OutfitThumbnail({
  outfit,
  compact = false,
  archive = false,
}: OutfitThumbnailProps) {
  const image = (
    <Image source={{ uri: outfit.imageUri }} style={styles.image} />
  );

  if (compact) {
    return <View style={[styles.container, styles.compact]}>{image}</View>;
  }

  return (
    <Pressable
      accessibilityLabel={`Open outfit from ${outfit.date}`}
      accessibilityRole="button"
      onPress={() =>
        router.push({
          pathname: '/outfit/[id]',
          params: { id: outfit.id },
        })
      }
      style={[styles.container, archive && styles.archive]}
    >
      {image}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 0.78,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    width: 132,
  },
  compact: {
    borderRadius: radii.sm,
    width: '100%',
  },
  archive: {
    borderRadius: radii.sm,
    width: 56,
  },
  image: {
    flex: 1,
    width: '100%',
  },
});
