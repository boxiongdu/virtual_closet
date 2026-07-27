import { StyleSheet, View } from 'react-native';

import { ClothingCard } from '../../features/clothing/ClothingCard';
import type { ClothingItem } from '../../features/clothing/clothing.types';
import { spacing } from '../../lib/theme';

type ClothingMasonryGalleryProps = {
  items: ClothingItem[];
};

const aspectRatios = [0.72, 0.88, 0.66, 0.8];

export function ClothingMasonryGallery({
  items,
}: ClothingMasonryGalleryProps) {
  const columns = items.reduce<[ClothingItem[], ClothingItem[]]>(
    (result, item, index) => {
      result[index % 2].push(item);
      return result;
    },
    [[], []],
  );

  return (
    <View style={styles.gallery}>
      {columns.map((column, columnIndex) => (
        <View key={columnIndex} style={styles.column}>
          {column.map((item, itemIndex) => {
            const originalIndex = itemIndex * 2 + columnIndex;

            return (
              <ClothingCard
                aspectRatio={
                  aspectRatios[originalIndex % aspectRatios.length]
                }
                item={item}
                key={item.id}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gallery: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.md,
  },
  column: {
    flex: 1,
    gap: spacing.md,
  },
});
