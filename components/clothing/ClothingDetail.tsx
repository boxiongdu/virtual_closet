import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  archiveClothing,
  deleteClothing,
  useClothingItem,
} from '../../features/clothing/clothing.store';
import type { PlaceholderTone } from '../../features/clothing/clothing.types';
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

export function ClothingDetail({ id }: ClothingDetailProps) {
  const item = useClothingItem(id);
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        >
          <Text style={styles.imageNumber}>{item.id}</Text>
        </View>
      )}

      <SafeAreaView edges={['top', 'bottom']} style={styles.overlay}>
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

        <View style={styles.information}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.details}>
            <DetailRow
              label="Category"
              value={formatCategory(item.category)}
            />
            <DetailRow label="Color" value={item.color} />
            <DetailRow label="Brand" value={item.brand ?? '—'} />
          </View>
        </View>
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
    padding: spacing.xl,
  },
  imageNumber: {
    color: colors.text,
    fontSize: fontSizes.subtitle,
    lineHeight: lineHeights.subtitle,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    width: '100%',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  roundButton: {
    alignItems: 'center',
    backgroundColor: colors.imageOverlay,
    borderColor: 'rgba(255, 252, 247, 0.28)',
    borderRadius: radii.pill,
    borderWidth: StyleSheet.hairlineWidth,
    height: 48,
    justifyContent: 'center',
    width: 48,
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
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: StyleSheet.hairlineWidth,
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
    alignSelf: 'flex-start',
    backgroundColor: colors.imageOverlay,
    borderRadius: radii.md,
    maxWidth: '92%',
    padding: spacing.lg,
  },
  title: {
    color: colors.surface,
    fontSize: fontSizes.action,
    fontWeight: '400',
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
    gap: spacing.sm,
  },
  detailLabel: {
    color: colors.border,
    fontSize: fontSizes.caption,
    letterSpacing: 1,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
  },
  detailValue: {
    color: colors.surface,
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
