import { Image, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { colors } from '../../lib/theme';
import type {
  ClothingItem,
  PlaceholderTone,
} from './clothing.types';

type ClothingCardProps = {
  aspectRatio: number;
  item: ClothingItem;
};

const toneColors: Record<PlaceholderTone, string> = {
  stone: colors.placeholderStone,
  taupe: colors.placeholderTaupe,
  ink: colors.placeholderInk,
  clay: colors.placeholderClay,
};

export function ClothingCard({ aspectRatio, item }: ClothingCardProps) {
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
      style={[styles.container, { aspectRatio }]}
    >
      {item.imageUri ? (
        <Image
          resizeMode="cover"
          source={{ uri: item.imageUri }}
          style={styles.image}
        />
      ) : (
        <View style={[styles.image, { backgroundColor: placeholderColor }]} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
  },
});
