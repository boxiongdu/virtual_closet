import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  addClothing,
  updateClothing,
} from '../../features/clothing/clothing.store';
import {
  clothingCategories,
  placeholderTones,
  type ClothingCategory,
  type ClothingInput,
  type ClothingItem,
  type PlaceholderTone,
} from '../../features/clothing/clothing.types';
import { colors, fontSizes, lineHeights, radii, spacing } from '../../lib/theme';

type ClothingFormProps = {
  item?: ClothingItem;
  onCancel?: () => void;
  onSaved?: () => void;
};

const toneColors: Record<PlaceholderTone, string> = {
  stone: colors.placeholderStone,
  taupe: colors.placeholderTaupe,
  ink: colors.placeholderInk,
  clay: colors.placeholderClay,
};

function formatCategory(category: ClothingCategory) {
  return category.replace('_', ' ');
}

export function ClothingForm({
  item,
  onCancel,
  onSaved,
}: ClothingFormProps) {
  const [imageUri, setImageUri] = useState(item?.imageUri ?? '');
  const [placeholderTone, setPlaceholderTone] = useState<PlaceholderTone>(
    item?.placeholderTone ?? 'stone',
  );
  const [category, setCategory] = useState<ClothingCategory>(
    item?.category ?? 'top',
  );
  const [color, setColor] = useState(item?.color ?? '');
  const [brand, setBrand] = useState(item?.brand ?? '');
  const [sourceUrl, setSourceUrl] = useState(item?.sourceUrl ?? '');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!color.trim()) {
      setError('Enter a color before saving.');
      return;
    }

    const input: ClothingInput = {
      brand,
      category,
      color,
      imageUri,
      placeholderTone,
      sourceUrl,
    };

    if (item) {
      updateClothing(item.id, input);
      onSaved?.();
      return;
    }

    const createdItem = addClothing(input);
    router.replace({
      pathname: '/clothing/[id]',
      params: { id: createdItem.id },
    });
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }

    router.back();
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.eyebrow}>
              {item ? 'Edit garment' : 'New garment'}
            </Text>
            <Text style={styles.title}>
              {item ? 'Update clothing' : 'Add clothing'}
            </Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Image placeholder</Text>
            <View style={styles.toneRow}>
              {placeholderTones.map((tone) => {
                const selected = placeholderTone === tone;

                return (
                  <Pressable
                    accessibilityLabel={`${tone} image placeholder`}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    key={tone}
                    onPress={() => setPlaceholderTone(tone)}
                    style={[
                      styles.tone,
                      { backgroundColor: toneColors[tone] },
                      selected && styles.toneSelected,
                    ]}
                  />
                );
              })}
            </View>
            <TextInput
              autoCapitalize="none"
              keyboardType="url"
              onChangeText={setImageUri}
              placeholder="Or paste an image URI"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              value={imageUri}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.optionRow}>
              {clothingCategories.map((option) => {
                const selected = category === option;

                return (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    key={option}
                    onPress={() => setCategory(option)}
                    style={[
                      styles.option,
                      selected && styles.optionSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selected && styles.optionTextSelected,
                      ]}
                    >
                      {formatCategory(option)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Color</Text>
            <TextInput
              autoCapitalize="words"
              onChangeText={setColor}
              placeholder="e.g. Charcoal"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              value={color}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Brand · optional</Text>
            <TextInput
              autoCapitalize="words"
              onChangeText={setBrand}
              placeholder="Brand"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              value={brand}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Source URL · optional</Text>
            <TextInput
              autoCapitalize="none"
              keyboardType="url"
              onChangeText={setSourceUrl}
              placeholder="https://"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              value={sourceUrl}
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              onPress={handleCancel}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={handleSave}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Save</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing['3xl'],
    paddingHorizontal: spacing.xl,
  },
  header: {
    paddingBottom: spacing['2xl'],
    paddingTop: spacing['3xl'],
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
  field: {
    marginBottom: spacing.xl,
  },
  label: {
    color: colors.text,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 1,
    lineHeight: lineHeights.caption,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderWidth: StyleSheet.hairlineWidth,
    color: colors.text,
    fontSize: fontSizes.body,
    minHeight: 52,
    paddingHorizontal: spacing.lg,
  },
  toneRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  tone: {
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderWidth: StyleSheet.hairlineWidth,
    height: 56,
    width: 56,
  },
  toneSelected: {
    borderColor: colors.accent,
    borderWidth: 2,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  option: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  optionSelected: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  optionText: {
    color: colors.text,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 0.8,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
  },
  optionTextSelected: {
    color: colors.surface,
  },
  error: {
    color: colors.accent,
    fontSize: fontSizes.caption,
    lineHeight: lineHeights.caption,
    marginBottom: spacing.lg,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.text,
    borderRadius: radii.pill,
    flex: 1,
    minHeight: 52,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: fontSizes.body,
    fontWeight: '600',
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    minHeight: 52,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: fontSizes.body,
    fontWeight: '600',
  },
});
