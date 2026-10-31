import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  pickOutfitImage,
  type OutfitImageSource,
} from '../../features/outfit/outfit.capture';
import { stageImageForNavigation } from '../../features/outfit/outfit.pending-image';
import { colors, fontSizes, lineHeights, radii, spacing } from '../../lib/theme';

type OutfitCaptureSheetProps = {
  date: string;
  visible: boolean;
  onClose: () => void;
};

export function OutfitCaptureSheet({
  date,
  visible,
  onClose,
}: OutfitCaptureSheetProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleSource = async (source: OutfitImageSource) => {
    if (isOpening) {
      return;
    }

    setIsOpening(true);

    try {
      const imageUri = await pickOutfitImage(source);
      if (!imageUri) {
        return;
      }

      onClose();
      router.push({
        pathname: '/outfit/preview',
        params: { date, imageUri: stageImageForNavigation(imageUri) },
      });
    } catch (error) {
      Alert.alert(
        'Unable to open photos',
        error instanceof Error ? error.message : 'Please try again.',
      );
    } finally {
      setIsOpening(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <SafeAreaView style={styles.backdrop}>
        <Pressable
          accessibilityLabel="Close photo options"
          onPress={onClose}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.sheet}>
          <Text style={styles.eyebrow}>Save this look</Text>
          <Text style={styles.title}>Choose a photo source</Text>

          {Platform.OS !== 'web' ? (
            <Pressable
              accessibilityRole="button"
              disabled={isOpening}
              onPress={() => void handleSource('camera')}
              style={styles.primaryAction}
            >
              <Text style={styles.primaryActionLabel}>Camera</Text>
            </Pressable>
          ) : null}
          <Pressable
            accessibilityRole="button"
            disabled={isOpening}
            onPress={() => void handleSource('library')}
            style={styles.secondaryAction}
          >
            <Text style={styles.secondaryActionLabel}>
              {Platform.OS === 'web' ? 'Upload from Computer' : 'Photo Library'}
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={onClose}
            style={styles.cancelAction}
          >
            <Text style={styles.cancelActionLabel}>Cancel</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: colors.imageOverlay,
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    padding: spacing.xl,
  },
  eyebrow: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 1.2,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: fontSizes.subtitle,
    lineHeight: lineHeights.subtitle,
    marginBottom: spacing.xl,
    marginTop: spacing.sm,
  },
  primaryAction: {
    alignItems: 'center',
    backgroundColor: colors.text,
    borderRadius: radii.pill,
    justifyContent: 'center',
    minHeight: 52,
  },
  primaryActionLabel: {
    color: colors.surface,
    fontSize: fontSizes.body,
    fontWeight: '600',
  },
  secondaryAction: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    marginTop: spacing.md,
    minHeight: 52,
  },
  secondaryActionLabel: {
    color: colors.text,
    fontSize: fontSizes.body,
    fontWeight: '600',
  },
  cancelAction: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    minHeight: 44,
  },
  cancelActionLabel: {
    color: colors.textMuted,
    fontSize: fontSizes.body,
  },
});
