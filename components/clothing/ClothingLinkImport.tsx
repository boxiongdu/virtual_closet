import { router, type Href } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  extractClothingShareTitle,
  extractClothingUrl,
  resolveClothingUrl,
} from '../../features/clothing/clothing.url';
import { colors, fontSizes, lineHeights, spacing } from '../../lib/theme';

export function ClothingLinkImport() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isResolving, setIsResolving] = useState(false);

  const handlePreview = async () => {
    const originalUrl = extractClothingUrl(url);
    if (!originalUrl) {
      setError('Please paste a valid Taobao or Tmall link.');
      return;
    }

    setError('');
    setIsResolving(true);
    const suggestedName = extractClothingShareTitle(url);
    const resolvedUrl = await resolveClothingUrl(originalUrl);
    setIsResolving(false);
    const resolvedParam = resolvedUrl
      ? `&resolvedUrl=${encodeURIComponent(resolvedUrl)}`
      : '';
    const nameParam = suggestedName
      ? `&suggestedName=${encodeURIComponent(suggestedName)}`
      : '';

    router.push(
      `/clothing/import-preview?originalUrl=${encodeURIComponent(originalUrl)}${resolvedParam}${nameParam}` as Href,
    );
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.topBar}>
          <Pressable
            accessibilityLabel="Back to closet"
            accessibilityRole="button"
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backLabel}>←</Text>
          </Pressable>
          <Text style={styles.eyebrow}>Closet archive</Text>
        </View>

        <View style={styles.content}>
          <View>
            <Text style={styles.title}>Add from Taobao</Text>
            <Text style={styles.supporting}>
              Paste a Taobao or Tmall link—or the complete text copied from the
              Taobao app.
            </Text>
          </View>

          <View>
            <Text style={styles.label}>Product link or share text</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isResolving}
              keyboardType="url"
              multiline
              onChangeText={(value) => {
                setUrl(value);
                if (error) {
                  setError('');
                }
              }}
              onSubmitEditing={handlePreview}
              placeholder="Paste Taobao link or copied product text"
              placeholderTextColor={colors.textMuted}
              style={styles.input}
              value={url}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>

          <Pressable
            accessibilityRole="button"
            disabled={isResolving}
            onPress={() => void handlePreview()}
            style={[styles.button, isResolving && styles.buttonDisabled]}
          >
            <Text style={styles.buttonLabel}>
              {isResolving ? 'Resolving…' : 'Continue'}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.archiveBackground,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
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
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: spacing['2xl'],
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['3xl'],
  },
  title: {
    color: colors.text,
    fontSize: fontSizes.title,
    letterSpacing: -1.2,
    lineHeight: lineHeights.title,
  },
  supporting: {
    color: colors.textMuted,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    marginTop: spacing.lg,
    maxWidth: 320,
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
    borderBottomColor: colors.text,
    borderBottomWidth: StyleSheet.hairlineWidth,
    color: colors.text,
    fontSize: fontSizes.body,
    minHeight: 96,
    paddingVertical: spacing.md,
    textAlignVertical: 'top',
  },
  error: {
    color: colors.accent,
    fontSize: fontSizes.caption,
    lineHeight: lineHeights.caption,
    marginTop: spacing.sm,
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.text,
    justifyContent: 'center',
    minHeight: 52,
  },
  buttonLabel: {
    color: colors.surface,
    fontSize: fontSizes.body,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.55,
  },
});
