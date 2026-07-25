import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ClothingCard } from '../../features/clothing/ClothingCard';
import { useClothingItems } from '../../features/clothing/clothing.store';
import type { ClothingItem } from '../../features/clothing/clothing.types';
import {
  colors,
  fontSizes,
  lineHeights,
  radii,
  spacing,
} from '../../lib/theme';

export default function ClosetScreen() {
  const clothingItems = useClothingItems();
  const activeItems = clothingItems.filter((item) => !item.archived);
  const renderItem = ({ item }: { item: ClothingItem }) => (
    <ClothingCard item={item} />
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <FlatList
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.content}
        data={activeItems}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <View>
              <Text style={styles.eyebrow}>Private wardrobe</Text>
              <Text style={styles.title}>Closet</Text>
            </View>
            <Pressable
              accessibilityLabel="Add clothing"
              accessibilityRole="button"
              onPress={() => router.push('/clothing/new')}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>＋</Text>
            </Pressable>
          </View>
        }
        numColumns={2}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing['4xl'] * 2,
    paddingHorizontal: spacing.xl,
  },
  header: {
    alignItems: 'flex-end',
    paddingBottom: spacing['2xl'],
    paddingTop: spacing['3xl'],
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eyebrow: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 1.4,
    lineHeight: lineHeights.caption,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: fontSizes.title,
    fontWeight: '400',
    letterSpacing: -1.2,
    lineHeight: lineHeights.title,
  },
  row: {
    gap: spacing.lg,
    marginBottom: spacing['2xl'],
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: colors.text,
    borderRadius: radii.pill,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  addButtonText: {
    color: colors.surface,
    fontSize: fontSizes.subtitle,
    lineHeight: lineHeights.subtitle,
  },
});
