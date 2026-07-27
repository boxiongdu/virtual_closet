import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {
  archiveClothing,
  deleteClothing,
  useClothingItem,
} from '../../features/clothing/clothing.store';
import type {
  ClothingItem,
  PlaceholderTone,
} from '../../features/clothing/clothing.types';
import { getClothingLinkSource } from '../../features/clothing/clothing.url';
import { colors, fontSizes, lineHeights, radii, spacing } from '../../lib/theme';
import { ClothingForm } from './ClothingForm';

type ClothingDetailProps = {
  id: string;
};

const toneColors: Record<PlaceholderTone, string> = {
  stone: colors.placeholderStone,
  taupe: colors.placeholderTaupe,
  ink: colors.placeholderInk,
  clay: colors.placeholderClay,
};

function formatCategory(category: string) {
  return category.replace('_', ' ');
}

function formatItemNumber(id: string) {
  const numericId = Number.parseInt(id, 10);
  return Number.isNaN(numericId)
    ? id.toUpperCase()
    : String(numericId).padStart(3, '0');
}

function formatSource(item: ClothingItem) {
  if (item.source.type === 'taobao') {
    return (
      getClothingLinkSource(
        item.source.resolvedUrl ?? item.source.originalUrl,
      ) ?? 'Taobao'
    );
  }

  if (item.source.type === 'url') {
    return 'Link';
  }

  return 'Photo';
}

export function ClothingDetail({ id }: ClothingDetailProps) {
  const item = useClothingItem(id);
  const insets = useSafeAreaInsets();
  const [isEditing, setIsEditing] = useState(false);
  const [isInformationVisible, setIsInformationVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const informationProgress = useRef(new Animated.Value(0)).current;

  if (!item) {
    return (
      <SafeAreaView style={styles.missingSafeArea}>
        <View style={styles.missing}>
          <Text style={styles.missingTitle}>Clothing not found</Text>
          <Pressable onPress={() => router.back()} style={styles.textButton}>
            <Text style={styles.textButtonLabel}>Back to closet</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (isEditing) {
    return (
      <ClothingForm
        item={item}
        onCancel={() => setIsEditing(false)}
        onSaved={() => setIsEditing(false)}
      />
    );
  }

  const handleArchive = () => {
    archiveClothing(item.id);
    router.back();
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete clothing?',
      'This removes the item from this local wardrobe.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteClothing(item.id);
            router.back();
          },
        },
      ],
    );
  };

  const setInformationVisible = (visible: boolean) => {
    setIsInformationVisible(visible);
    Animated.timing(informationProgress, {
      duration: 320,
      toValue: visible ? 1 : 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {item.imageUri ? (
        <Image
          resizeMode="cover"
          source={{ uri: item.imageUri }}
          style={styles.image}
        />
      ) : (
        <View
          style={[
            styles.image,
            { backgroundColor: toneColors[item.placeholderTone] },
          ]}
        />
      )}

      <Pressable
        accessibilityLabel={
          isInformationVisible
            ? 'Hide clothing information'
            : 'Reveal clothing information'
        }
        accessibilityRole="button"
        onPress={() => setInformationVisible(!isInformationVisible)}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView
        edges={['top']}
        pointerEvents="box-none"
        style={styles.overlay}
      >
        <View style={styles.topBar}>
          <Pressable
            accessibilityLabel="Back to closet"
            accessibilityRole="button"
            onPress={() => router.back()}
            style={styles.roundButton}
          >
            <Text style={styles.roundButtonLabel}>←</Text>
          </Pressable>

          <View style={styles.menuArea}>
            <Pressable
              accessibilityLabel="Clothing management menu"
              accessibilityRole="button"
              accessibilityState={{ expanded: isMenuOpen }}
              onPress={() => setIsMenuOpen((open) => !open)}
              style={styles.roundButton}
            >
              <Text style={styles.menuButtonLabel}>•••</Text>
            </Pressable>

            {isMenuOpen ? (
              <View style={styles.menu}>
                <Pressable
                  onPress={() => {
                    setIsMenuOpen(false);
                    setIsEditing(true);
                  }}
                  style={styles.menuItem}
                >
                  <Text style={styles.menuItemLabel}>Edit</Text>
                </Pressable>
                <Pressable
                  onPress={handleArchive}
                  style={[styles.menuItem, styles.menuItemBorder]}
                >
                  <Text style={styles.menuItemLabel}>Archive</Text>
                </Pressable>
                <Pressable
                  onPress={handleDelete}
                  style={[styles.menuItem, styles.menuItemBorder]}
                >
                  <Text style={styles.deleteMenuItemLabel}>Delete</Text>
                </Pressable>
              </View>
            ) : null}
          </View>
        </View>

        <Animated.View
          pointerEvents={isInformationVisible ? 'auto' : 'none'}
          style={[
            styles.information,
            {
              opacity: informationProgress,
              transform: [
                {
                  translateY: informationProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [160, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Pressable
            accessibilityLabel="Hide clothing information"
            accessibilityRole="button"
            onPress={() => setInformationVisible(false)}
            style={[
              styles.informationContent,
              { paddingBottom: spacing.xl + insets.bottom },
            ]}
          >
            <Text style={styles.archiveLabel}>
              ITEM No.{formatItemNumber(item.id)}
            </Text>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.details}>
              <DetailRow
                label="Category"
                value={formatCategory(item.category)}
              />
              <DetailRow label="Color" value={item.color || '—'} />
              <DetailRow label="Brand" value={item.brand ?? '—'} />
              <DetailRow label="Source" value={formatSource(item)} />
            </View>
          </Pressable>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

type DetailRowProps = {
  label: string;
  value: string;
};

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.text,
  },
  missingSafeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: spacing.lg,
    width: '100%',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    zIndex: 2,
  },
  roundButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(23, 23, 23, 0.56)',
    borderRadius: radii.pill,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  roundButtonLabel: {
    color: colors.surface,
    fontSize: fontSizes.subtitle,
    lineHeight: lineHeights.subtitle,
  },
  menuButtonLabel: {
    color: colors.surface,
    fontSize: fontSizes.body,
    fontWeight: '700',
    letterSpacing: 1,
    lineHeight: lineHeights.body,
  },
  menuArea: {
    alignItems: 'flex-end',
  },
  menu: {
    backgroundColor: colors.surface,
    marginTop: spacing.sm,
    overflow: 'hidden',
    width: 152,
  },
  menuItem: {
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: spacing.lg,
  },
  menuItemBorder: {
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  menuItemLabel: {
    color: colors.text,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
  },
  deleteMenuItemLabel: {
    color: colors.accent,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
  },
  information: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(248, 246, 241, 0.26)',
  },
  informationContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  archiveLabel: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 1.2,
    lineHeight: lineHeights.caption,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: fontSizes.action,
    fontWeight: '500',
    letterSpacing: -0.8,
    lineHeight: lineHeights.action,
  },
  details: {
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  detailRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  detailLabel: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    letterSpacing: 1,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
    width: 96,
  },
  detailValue: {
    color: colors.text,
    fontSize: fontSizes.caption,
    lineHeight: lineHeights.caption,
    textTransform: 'capitalize',
  },
  missing: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  missingTitle: {
    color: colors.text,
    fontSize: fontSizes.subtitle,
    lineHeight: lineHeights.subtitle,
    marginBottom: spacing.lg,
  },
  textButton: {
    minHeight: 44,
    justifyContent: 'center',
  },
  textButtonLabel: {
    color: colors.accent,
    fontSize: fontSizes.body,
  },
});
