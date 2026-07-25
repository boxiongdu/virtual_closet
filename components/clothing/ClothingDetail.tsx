import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
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

  if (!item) {
    return (
      <SafeAreaView style={styles.safeArea}>
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
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonLabel}>← Closet</Text>
        </Pressable>

        {item.imageUri ? (
          <Image source={{ uri: item.imageUri }} style={styles.image} />
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

        <View style={styles.header}>
          <Text style={styles.eyebrow}>{formatCategory(item.category)}</Text>
          <Text style={styles.title}>{item.name}</Text>
        </View>

        <View style={styles.details}>
          <DetailRow label="Category" value={formatCategory(item.category)} />
          <DetailRow label="Color" value={item.color} />
          <DetailRow label="Brand" value={item.brand ?? '—'} />
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={() => setIsEditing(true)}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonLabel}>Edit</Text>
          </Pressable>
          <Pressable onPress={handleArchive} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonLabel}>Archive</Text>
          </Pressable>
          <Pressable onPress={handleDelete} style={styles.deleteButton}>
            <Text style={styles.deleteButtonLabel}>Delete</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing['3xl'],
    paddingHorizontal: spacing.xl,
  },
  backButton: {
    alignSelf: 'flex-start',
    minHeight: 44,
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  backButtonLabel: {
    color: colors.text,
    fontSize: fontSizes.body,
  },
  image: {
    aspectRatio: 0.9,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: StyleSheet.hairlineWidth,
    height: undefined,
    justifyContent: 'space-between',
    padding: spacing.lg,
    width: '100%',
  },
  imageNumber: {
    color: colors.text,
    fontSize: fontSizes.subtitle,
    lineHeight: lineHeights.subtitle,
  },
  header: {
    paddingBottom: spacing['2xl'],
    paddingTop: spacing['2xl'],
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
  details: {
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  detailRow: {
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
  },
  detailLabel: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    letterSpacing: 1,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
  },
  detailValue: {
    color: colors.text,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    textTransform: 'capitalize',
  },
  actions: {
    gap: spacing.md,
    paddingTop: spacing['2xl'],
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.text,
    borderRadius: radii.pill,
    justifyContent: 'center',
    minHeight: 52,
  },
  primaryButtonLabel: {
    color: colors.surface,
    fontSize: fontSizes.body,
    fontWeight: '600',
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    minHeight: 52,
  },
  secondaryButtonLabel: {
    color: colors.text,
    fontSize: fontSizes.body,
    fontWeight: '600',
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  deleteButtonLabel: {
    color: colors.accent,
    fontSize: fontSizes.body,
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
