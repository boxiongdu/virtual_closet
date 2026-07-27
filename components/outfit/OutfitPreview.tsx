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

import { saveOutfit } from '../../features/outfit/outfit.store';
import { colors, fontSizes, lineHeights, radii, spacing } from '../../lib/theme';

type OutfitPreviewProps = {
  date: string;
  imageUri: string;
};

export function OutfitPreview({ date, imageUri }: OutfitPreviewProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      await saveOutfit({ date, imageUri });
      router.back();
    } catch {
      Alert.alert('Unable to save look', 'Please try again.');
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image resizeMode="cover" source={{ uri: imageUri }} style={styles.image} />

      <SafeAreaView edges={['top', 'bottom']} style={styles.overlay}>
        <View style={styles.topBar}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            style={styles.roundButton}
          >
            <Text style={styles.roundButtonLabel}>←</Text>
          </Pressable>
          <Text style={styles.previewLabel}>Preview</Text>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.title}>Save this look?</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            disabled={isSaving}
            onPress={() => void handleSave()}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonLabel}>
              {isSaving ? 'Saving…' : 'Save Look'}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.text,
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roundButton: {
    alignItems: 'center',
    backgroundColor: colors.imageOverlay,
    borderRadius: radii.pill,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  roundButtonLabel: {
    color: colors.surface,
    fontSize: fontSizes.subtitle,
    lineHeight: lineHeights.subtitle,
  },
  previewLabel: {
    color: colors.surface,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 1.2,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
  },
  footer: {
    backgroundColor: colors.imageOverlay,
    borderRadius: radii.md,
    gap: spacing.lg,
    padding: spacing.lg,
  },
  date: {
    color: colors.border,
    fontSize: fontSizes.caption,
    letterSpacing: 1,
    lineHeight: lineHeights.caption,
  },
  title: {
    color: colors.surface,
    fontSize: fontSizes.subtitle,
    lineHeight: lineHeights.subtitle,
    marginTop: spacing.xs,
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    justifyContent: 'center',
    minHeight: 52,
  },
  saveButtonLabel: {
    color: colors.text,
    fontSize: fontSizes.body,
    fontWeight: '600',
  },
});
