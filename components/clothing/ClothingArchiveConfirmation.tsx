import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Image,
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

import { addClothing } from '../../features/clothing/clothing.store';
import type {
  ClothingCategory,
  ClothingSource,
} from '../../features/clothing/clothing.types';
import { colors, fontSizes, lineHeights, spacing } from '../../lib/theme';

type ClothingArchiveConfirmationProps = {
  imageUri?: string;
  source: Extract<ClothingSource, { type: 'photo' | 'taobao' }>;
  suggestedName?: string;
};

const categories: {
  label: string;
  value: ClothingCategory;
}[] = [
  { label: 'Tops', value: 'top' },
  { label: 'Bottoms', value: 'bottom' },
  { label: 'Outerwear', value: 'outerwear' },
  { label: 'Shoes', value: 'shoes' },
  { label: 'Accessories', value: 'accessory' },
];

export function ClothingArchiveConfirmation({
  imageUri,
  source,
  suggestedName = '',
}: ClothingArchiveConfirmationProps) {
  const hasSaved = useRef(false);
  const [name, setName] = useState(suggestedName);
  const [category, setCategory] = useState<ClothingCategory>();
  const [color, setColor] = useState('');
  const [brand, setBrand] = useState('');
  const [error, setError] = useState('');

  const saveItem = () => {
    if (hasSaved.current) {
      return;
    }

    if (source.type === 'photo' && !imageUri) {
      setError('Choose an image before saving this item.');
      return;
    }

    if (source.type === 'taobao' && !source.originalUrl) {
      setError('Return and paste a valid Taobao or Tmall link.');
      return;
    }

    if (!name.trim()) {
      setError('Enter a name for this item.');
      return;
    }

    if (!category) {
      setError('Choose a category for this item.');
      return;
    }

    hasSaved.current = true;
    addClothing({
      brand,
      category,
      color,
      imageUri,
      name,
      notes: undefined,
      placeholderTone: 'stone',
      purchaseDate: undefined,
      source,
    });

    router.dismissTo('/closet');
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
          <View style={styles.topBar}>
            <Pressable
              accessibilityLabel="Cancel adding clothing"
              accessibilityRole="button"
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Text style={styles.backLabel}>←</Text>
            </Pressable>
            <Text style={styles.eyebrow}>Archive a piece</Text>
          </View>

          {imageUri ? (
            <Image
              resizeMode="cover"
              source={{ uri: imageUri }}
              style={styles.image}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderTitle}>Taobao archive piece</Text>
            </View>
          )}

          <View style={styles.fields}>
            <ArchiveField
              label="Item name"
              onChangeText={(value) => {
                setName(value);
                setError('');
              }}
              placeholder="Essential Shirt"
              value={name}
            />

            <View style={styles.field}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.categoryRow}>
                {categories.map((option) => {
                  const selected = category === option.value;

                  return (
                    <Pressable
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                      key={option.value}
                      onPress={() => {
                        setCategory(option.value);
                        setError('');
                      }}
                      style={styles.category}
                    >
                      <Text
                        style={[
                          styles.categoryLabel,
                          selected && styles.categoryLabelSelected,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <ArchiveField
              label="Color · optional"
              onChangeText={setColor}
              placeholder="Ivory"
              value={color}
            />
            <ArchiveField
              label="Brand · optional"
              onChangeText={setBrand}
              placeholder="Brand"
              value={brand}
            />

            <View style={styles.sourceRow}>
              <Text style={styles.label}>Source</Text>
              <Text style={styles.sourceValue}>
                {source.type === 'taobao' ? 'Taobao' : 'Photo'}
              </Text>
            </View>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            accessibilityRole="button"
            onPress={saveItem}
            style={styles.saveButton}
          >
            <Text style={styles.saveLabel}>Save</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

type ArchiveFieldProps = {
  label: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  value: string;
};

function ArchiveField({
  label,
  onChangeText,
  placeholder,
  value,
}: ArchiveFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCapitalize="words"
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.archiveBackground,
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing['3xl'],
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  backButton: {
    justifyContent: 'center',
    minHeight: 44,
    minWidth: 44,
  },
  backLabel: {
    color: colors.text,
    fontSize: fontSizes.subtitle,
    lineHeight: lineHeights.subtitle,
  },
  eyebrow: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 1.2,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
  },
  image: {
    aspectRatio: 0.82,
    width: '100%',
  },
  imagePlaceholder: {
    aspectRatio: 0.82,
    backgroundColor: colors.placeholderStone,
    justifyContent: 'flex-end',
    padding: spacing.xl,
    width: '100%',
  },
  placeholderTitle: {
    color: colors.text,
    fontSize: fontSizes.subtitle,
    lineHeight: lineHeights.subtitle,
  },
  fields: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['2xl'],
  },
  field: {
    marginBottom: spacing.xl,
  },
  label: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 1,
    lineHeight: lineHeights.caption,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: colors.text,
    borderBottomWidth: StyleSheet.hairlineWidth,
    color: colors.text,
    fontSize: fontSizes.subtitle,
    lineHeight: lineHeights.subtitle,
    minHeight: 44,
    paddingVertical: spacing.sm,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  category: {
    justifyContent: 'center',
    minHeight: 36,
  },
  categoryLabel: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 0.8,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
  },
  categoryLabelSelected: {
    color: colors.text,
    textDecorationLine: 'underline',
  },
  sourceRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sourceValue: {
    color: colors.text,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    textTransform: 'uppercase',
  },
  error: {
    color: colors.accent,
    fontSize: fontSizes.caption,
    lineHeight: lineHeights.caption,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: colors.text,
    justifyContent: 'center',
    marginHorizontal: spacing.xl,
    minHeight: 52,
  },
  saveLabel: {
    color: colors.surface,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 1.2,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
  },
});
