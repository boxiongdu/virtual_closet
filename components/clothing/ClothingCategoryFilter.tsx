import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import { colors, fontSizes, lineHeights, spacing } from '../../lib/theme';

export const closetFilters = [
  'all',
  'top',
  'bottom',
  'outerwear',
  'shoes',
  'accessory',
] as const;

export type ClosetFilter = (typeof closetFilters)[number];

const filterLabels: Record<ClosetFilter, string> = {
  all: 'All',
  top: 'Tops',
  bottom: 'Bottoms',
  outerwear: 'Outerwear',
  shoes: 'Shoes',
  accessory: 'Accessories',
};

type ClothingCategoryFilterProps = {
  onChange: (filter: ClosetFilter) => void;
  value: ClosetFilter;
};

export function ClothingCategoryFilter({
  onChange,
  value,
}: ClothingCategoryFilterProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {closetFilters.map((filter) => {
        const selected = value === filter;

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected }}
            key={filter}
            onPress={() => onChange(filter)}
            style={styles.filter}
          >
            <Text
              style={[
                styles.filterLabel,
                selected && styles.filterLabelSelected,
              ]}
            >
              {filterLabels[filter]}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl,
    paddingRight: spacing.xl,
  },
  filter: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 1,
    minHeight: 36,
    justifyContent: 'center',
  },
  filterLabel: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 1,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
  },
  filterLabelSelected: {
    color: colors.text,
    textDecorationLine: 'underline',
  },
});
