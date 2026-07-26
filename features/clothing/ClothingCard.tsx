import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { colors, fontSizes, lineHeights, radii, spacing } from '../../lib/theme';
import type {
  ClothingItem,
  PlaceholderTone,
} from './clothing.types';

type ClothingCardProps = {
  item: ClothingItem;
};

const toneColors: Record<PlaceholderTone, string> = {
  stone: colors.placeholderStone,
  taupe: colors.placeholderTaupe,
  ink: colors.placeholderInk,
  clay: colors.placeholderClay,
};

export function ClothingCard({ item }: ClothingCardProps) {
  const placeholderColor = toneColors[item.placeholderTone];

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() =>
        router.push({
          pathname: '/clothing/[id]',
          params: { id: item.id },
        })
      }
      style={styles.container}
    >
      {item.imageUri ? (
        <Image
          resizeMode="cover"
          source={{ uri: item.imageUri }}
          style={styles.image}
        />
      ) : (
        <View
          style={[styles.image, { backgroundColor: placeholderColor }]}
        >
          <Text style={styles.number}>{item.id}</Text>
        </View>
      )}

      <View style={styles.information}>
        <Text numberOfLines={2} style={styles.name}>
          {item.name}
        </Text>
        <Text numberOfLines={1} style={styles.metadata}>
          {item.category.replace('_', ' ')} · {item.color}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 0.78,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    padding: spacing.md,
    width: '100%',
  },
  number: {
    color: colors.surface,
    fontSize: fontSizes.subtitle,
    fontWeight: '400',
    letterSpacing: -0.4,
    lineHeight: lineHeights.subtitle,
  },
  information: {
    backgroundColor: colors.imageOverlay,
    bottom: 0,
    left: 0,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    position: 'absolute',
    right: 0,
  },
  name: {
    color: colors.surface,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
  },
  metadata: {
    color: colors.surface,
    fontSize: fontSizes.caption,
    letterSpacing: 0.8,
    lineHeight: lineHeights.caption,
    marginTop: spacing.xs,
    textTransform: 'uppercase',
  },
});
