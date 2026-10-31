import { router, type Href } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ClothingAddSheet } from '../../components/clothing/ClothingAddSheet';
import { ClosetEmptyState } from '../../components/clothing/ClosetEmptyState';
import {
  ClothingCategoryFilter,
  type ClosetFilter,
} from '../../components/clothing/ClothingCategoryFilter';
import { ClothingMasonryGallery } from '../../components/clothing/ClothingMasonryGallery';
import { DeveloperBar } from '../../components/shared/DeveloperBar';
import {
  pickOutfitImage,
  type OutfitImageSource,
} from '../../features/outfit/outfit.capture';
import { useClothingItems } from '../../features/clothing/clothing.store';
import { stageImageForNavigation } from '../../features/outfit/outfit.pending-image';
import { colors, fontSizes, lineHeights, spacing } from '../../lib/theme';

export default function ClosetScreen() {
  const galleryRef = useRef<ScrollView>(null);
  const isOpeningPicker = useRef(false);
  const previousItemCount = useRef(0);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [filter, setFilter] = useState<ClosetFilter>('all');
  const clothingItems = useClothingItems();
  const activeItems = clothingItems.filter((item) => !item.archived);
  const visibleItems = activeItems.filter(
    (item) => filter === 'all' || item.category === filter,
  );

  useEffect(() => {
    if (activeItems.length > previousItemCount.current) {
      galleryRef.current?.scrollTo({ animated: true, y: 0 });
    }
    previousItemCount.current = activeItems.length;
  }, [activeItems.length]);

  const choosePhoto = async (source: OutfitImageSource) => {
    if (isOpeningPicker.current) {
      return;
    }

    isOpeningPicker.current = true;
    try {
      const imageUri = await pickOutfitImage(source);
      if (imageUri) {
        setIsAddSheetOpen(false);
        router.push({
          pathname: '/clothing/new',
          params: { imageUri: stageImageForNavigation(imageUri) },
        });
      }
    } catch (error) {
      Alert.alert(
        'Unable to open photos',
        error instanceof Error ? error.message : 'Please try again.',
      );
    } finally {
      isOpeningPicker.current = false;
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        ref={galleryRef}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>Personal archive</Text>
            <Text style={styles.title}>PRIVATE WARDROBE</Text>
          </View>
          <Pressable
            accessibilityLabel="Add clothing"
            accessibilityRole="button"
            onPress={() => {
              setFilter('all');
              setIsAddSheetOpen(true);
            }}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>＋</Text>
          </Pressable>
        </View>

        <View style={styles.filters}>
          <ClothingCategoryFilter onChange={setFilter} value={filter} />
        </View>

        {activeItems.length === 0 ? (
          <ClosetEmptyState
            onAdd={() => {
              setFilter('all');
              setIsAddSheetOpen(true);
            }}
          />
        ) : (
          <ClothingMasonryGallery items={visibleItems} />
        )}

        <DeveloperBar />
      </ScrollView>
      <ClothingAddSheet
        onCamera={() => void choosePhoto('camera')}
        onClose={() => setIsAddSheetOpen(false)}
        onImportLink={() => {
          setIsAddSheetOpen(false);
          router.push('/clothing/import' as Href);
        }}
        onLibrary={() => void choosePhoto('library')}
        visible={isAddSheetOpen}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.archiveBackground,
  },
  content: {
    paddingBottom: spacing['4xl'] * 2,
    paddingHorizontal: spacing.xl,
  },
  header: {
    alignItems: 'center',
    paddingBottom: spacing.xl,
    paddingTop: spacing['2xl'],
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
    fontSize: fontSizes.action,
    fontWeight: '600',
    letterSpacing: -1,
    lineHeight: lineHeights.action,
  },
  filters: {
    marginBottom: spacing.xl,
  },
  addButton: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  addButtonText: {
    color: colors.text,
    fontSize: fontSizes.action,
    fontWeight: '200',
    lineHeight: lineHeights.action,
  },
});
