import { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { updateClothing } from '../../features/clothing/clothing.store';
import {
  clothingCategories,
  type ClothingCategory,
  type ClothingInput,
  type ClothingItem,
  type PlaceholderTone,
} from '../../features/clothing/clothing.types';
import {
  pickOutfitImage,
  type OutfitImageSource,
} from '../../features/outfit/outfit.capture';
import { colors, fontSizes, lineHeights, radii, spacing } from '../../lib/theme';

type ClothingFormProps = {
  item: ClothingItem;
  onCancel: () => void;
  onSaved: () => void;
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

function getSourceUrl(item: ClothingItem) {
  if (item.source.type === 'taobao') {
    return item.source.resolvedUrl ?? item.source.originalUrl;
  }

  return item.source.type === 'url' ? item.source.url : undefined;
}

export function ClothingForm({
  item,
  onCancel,
  onSaved,
}: ClothingFormProps) {
  const [imageUri, setImageUri] = useState(item.imageUri);
  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [color, setColor] = useState(item.color);
  const [brand, setBrand] = useState(item.brand ?? '');
  const [purchaseDate, setPurchaseDate] = useState(item.purchaseDate ?? '');
  const [notes, setNotes] = useState(item.notes ?? '');
  const [isOpeningImage, setIsOpeningImage] = useState(false);
  const [error, setError] = useState('');
  const sourceUrl = getSourceUrl(item);
  const sourceLabel = item.source.type === 'photo' ? 'Photo' : 'Taobao';

  const replaceImage = async (source: OutfitImageSource) => {
    if (isOpeningImage) {
      return;
    }

    setIsOpeningImage(true);
    try {
      const nextImageUri = await pickOutfitImage(source);
      if (nextImageUri) {
        setImageUri(nextImageUri);
      }
    } catch (pickerError) {
      Alert.alert(
        'Unable to open photos',
        pickerError instanceof Error
          ? pickerError.message
          : 'Please try again.',
      );
    } finally {
      setIsOpeningImage(false);
    }
  };

  const showImageOptions = () => {
    Alert.alert('Replace garment image', undefined, [
      {
        text: 'Take Photo',
        onPress: () => void replaceImage('camera'),
      },
      {
        text: 'Choose from Album',
        onPress: () => void replaceImage('library'),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleSave = () => {
    if (!name.trim()) {
      setError('Enter a name before saving.');
      return;
    }

    const input: ClothingInput = {
      brand,
      category,
      color,
      imageUri,
      name,
      notes,
      placeholderTone: item.placeholderTone,
      purchaseDate,
      source: item.source,
    };

    updateClothing(item.id, input);
    onSaved();
  };

  const openSource = async () => {
    if (!sourceUrl) {
      return;
    }

    try {
      await Linking.openURL(sourceUrl);
    } catch {
      Alert.alert('Unable to open source', 'Please try again later.');
    }
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
              accessibilityLabel="Cancel editing"
              accessibilityRole="button"
              onPress={onCancel}
              style={styles.backButton}
            >
              <Text style={styles.backLabel}>←</Text>
            </Pressable>
            <Text style={styles.eyebrow}>Update archive piece</Text>
          </View>

          <Pressable
            accessibilityHint="Opens camera and album options"
            accessibilityLabel="Replace garment image"
            accessibilityRole="button"
            disabled={isOpeningImage}
            onPress={showImageOptions}
            style={styles.imageArea}
          >
            {imageUri ? (
              <Image
                resizeMode="cover"
                source={{ uri: imageUri }}
                style={styles.image}
              />
            ) : (
              <View
                style={[
                  styles.image,
                  {
                    backgroundColor: toneColors[item.placeholderTone],
                  },
                ]}
              />
            )}
            <View style={styles.imageAction}>
              <Text style={styles.imageActionLabel}>
                {isOpeningImage ? 'Opening…' : 'Tap to replace'}
              </Text>
            </View>
          </Pressable>

          <View style={styles.fields}>
            <ArchiveInput
              label="Name"
              onChangeText={(value) => {
                setName(value);
                setError('');
              }}
              placeholder="Item name"
              value={name}
            />

            <View style={styles.field}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.categoryRow}>
                {clothingCategories.map((option) => {
                  const selected = category === option;

                  return (
                    <Pressable
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                      key={option}
                      onPress={() => setCategory(option)}
                      style={[
                        styles.category,
                        selected && styles.categorySelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.categoryLabel,
                          selected && styles.categoryLabelSelected,
                        ]}
                      >
                        {formatCategory(option)}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <ArchiveInput
              label="Color"
              onChangeText={setColor}
              placeholder="Color"
              value={color}
            />
            <ArchiveInput
              label="Brand"
              onChangeText={setBrand}
              placeholder="Brand · optional"
              value={brand}
            />
            <ArchiveInput
              autoCapitalize="none"
              label="Purchase date"
              onChangeText={setPurchaseDate}
              placeholder="MM.DD.YYYY"
              value={purchaseDate}
            />

            <View style={styles.sourceSection}>
              <View style={styles.sourceRow}>
                <Text style={styles.label}>Source type</Text>
                <Text style={styles.sourceValue}>{sourceLabel}</Text>
              </View>
              <Text style={styles.label}>Source URL</Text>
              <Text numberOfLines={2} style={styles.sourceUrl}>
                {sourceUrl ?? '—'}
              </Text>
              {sourceUrl ? (
                <Pressable
                  accessibilityRole="link"
                  onPress={() => void openSource()}
                  style={styles.openSource}
                >
                  <Text style={styles.openSourceLabel}>Open Source ↗</Text>
                </Pressable>
              ) : null}
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Notes · optional</Text>
              <TextInput
                multiline
                onChangeText={setNotes}
                placeholder="A memory, material, or styling note"
                placeholderTextColor={colors.textMuted}
                style={[styles.input, styles.notesInput]}
                textAlignVertical="top"
                value={notes}
              />
            </View>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              onPress={onCancel}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelLabel}>Cancel</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={handleSave}
              style={styles.saveButton}
            >
              <Text style={styles.saveLabel}>Save</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

type ArchiveInputProps = {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  label: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  value: string;
};

function ArchiveInput({
  autoCapitalize = 'words',
  label,
  onChangeText,
  placeholder,
  value,
}: ArchiveInputProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCapitalize={autoCapitalize}
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
  imageArea: {
    aspectRatio: 0.82,
    width: '100%',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  imageAction: {
    backgroundColor: 'rgba(248, 246, 241, 0.78)',
    bottom: 0,
    left: 0,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    position: 'absolute',
  },
  imageActionLabel: {
    color: colors.text,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 1,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
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
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    minHeight: 44,
    paddingVertical: spacing.sm,
  },
  notesInput: {
    minHeight: 104,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  category: {
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  categorySelected: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  categoryLabel: {
    color: colors.text,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 0.7,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
  },
  categoryLabelSelected: {
    color: colors.surface,
  },
  sourceSection: {
    marginBottom: spacing['2xl'],
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
  sourceUrl: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    lineHeight: lineHeights.caption,
  },
  openSource: {
    alignSelf: 'flex-start',
    marginTop: spacing.md,
    minHeight: 36,
    justifyContent: 'center',
  },
  openSourceLabel: {
    color: colors.text,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 0.8,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
  },
  error: {
    color: colors.accent,
    fontSize: fontSizes.caption,
    lineHeight: lineHeights.caption,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  cancelButton: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    justifyContent: 'center',
    minHeight: 52,
  },
  cancelLabel: {
    color: colors.text,
    fontSize: fontSizes.body,
    fontWeight: '600',
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: colors.text,
    borderRadius: radii.pill,
    flex: 1,
    justifyContent: 'center',
    minHeight: 52,
  },
  saveLabel: {
    color: colors.surface,
    fontSize: fontSizes.body,
    fontWeight: '600',
  },
});
