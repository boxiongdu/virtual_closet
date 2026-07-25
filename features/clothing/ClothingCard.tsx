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
  const usesDarkBackground = item.placeholderTone === 'ink';

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
        <Image source={{ uri: item.imageUri }} style={styles.imagePlaceholder} />
      ) : (
        <View
          style={[
            styles.imagePlaceholder,
            { backgroundColor: placeholderColor },
          ]}
        >
          <Text
            style={[
              styles.number,
              usesDarkBackground && styles.numberOnDark,
            ]}
          >
            {item.id}
          </Text>
          <View
            style={[
              styles.categoryBadge,
              usesDarkBackground && styles.categoryBadgeOnDark,
            ]}
          >
            <Text
              style={[
                styles.category,
                usesDarkBackground && styles.categoryOnDark,
              ]}
            >
              {item.category.replace('_', ' ')}
            </Text>
          </View>
        </View>
      )}

      <Text numberOfLines={1} style={styles.name}>
        {item.name}
      </Text>
      <Text style={styles.metadata}>{item.color}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagePlaceholder: {
    aspectRatio: 0.78,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'space-between',
    overflow: 'hidden',
    padding: spacing.md,
    width: '100%',
  },
  number: {
    color: colors.text,
    fontSize: fontSizes.subtitle,
    fontWeight: '400',
    letterSpacing: -0.4,
    lineHeight: lineHeights.subtitle,
  },
  numberOnDark: {
    color: colors.surface,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  categoryBadgeOnDark: {
    backgroundColor: colors.text,
    borderColor: colors.textMuted,
    borderWidth: StyleSheet.hairlineWidth,
  },
  category: {
    color: colors.text,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 1,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
  },
  categoryOnDark: {
    color: colors.surface,
  },
  name: {
    color: colors.text,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    marginTop: spacing.md,
  },
  metadata: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    letterSpacing: 0.8,
    lineHeight: lineHeights.caption,
    marginTop: spacing.xs,
    textTransform: 'uppercase',
  },
});
