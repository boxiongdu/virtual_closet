import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import type { Outfit } from '../../features/outfit/outfit.types';
import { colors, radii, spacing } from '../../lib/theme';

type OutfitThumbnailProps = {
  outfit: Outfit;
  compact?: boolean;
  archive?: boolean;
};

const placeholderColors: Record<string, string> = {
  stone: colors.placeholderStone,
  taupe: colors.placeholderTaupe,
  ink: colors.placeholderInk,
  clay: colors.placeholderClay,
};

function getPlaceholderColor(imageUri: string) {
  const tone = imageUri.replace('placeholder://', '');
  return placeholderColors[tone] ?? colors.placeholderStone;
}

export function OutfitThumbnail({
  outfit,
  compact = false,
  archive = false,
}: OutfitThumbnailProps) {
  const isPlaceholder = outfit.imageUri.startsWith('placeholder://');
  const image = isPlaceholder ? (
    <View
      style={[
        styles.image,
        { backgroundColor: getPlaceholderColor(outfit.imageUri) },
      ]}
    >
      <Text style={styles.mark}>LOOK</Text>
    </View>
  ) : (
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
    justifyContent: 'flex-end',
    padding: spacing.sm,
    width: '100%',
  },
  mark: {
    color: colors.surface,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
});
