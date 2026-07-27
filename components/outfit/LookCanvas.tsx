import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Outfit } from '../../features/outfit/outfit.types';
import { colors, fontSizes, lineHeights, spacing } from '../../lib/theme';

type LookCanvasProps = {
  dateLabel: string;
  isLoading?: boolean;
  lookNumber?: number;
  onCapture: () => void;
  outfit?: Outfit;
};

export function LookCanvas({
  dateLabel,
  isLoading = false,
  lookNumber,
  onCapture,
  outfit,
}: LookCanvasProps) {
  return (
    <View style={styles.container}>
      {outfit ? (
        <>
          <View style={styles.mediaFrame}>
            <Image
              resizeMode="cover"
              source={{ uri: outfit.imageUri }}
              style={styles.media}
            />
            <Pressable
              accessibilityLabel={`Open look from ${dateLabel}`}
              accessibilityRole="button"
              onPress={() =>
                router.push({
                  pathname: '/outfit/[id]',
                  params: { id: outfit.id },
                })
              }
              style={StyleSheet.absoluteFill}
            />
          </View>
          <View style={styles.information}>
            <View>
              <Text style={styles.date}>{dateLabel}</Text>
              <Text style={styles.caption}>
                LOOK No.{String(lookNumber ?? 0).padStart(3, '0')}
              </Text>
            </View>
            <Pressable
              accessibilityLabel={`Replace look from ${dateLabel}`}
              accessibilityRole="button"
              onPress={onCapture}
              style={styles.replaceButton}
            >
              <Text style={styles.replaceButtonLabel}>Replace</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <Pressable
          accessibilityLabel={`Add look for ${dateLabel}`}
          accessibilityRole="button"
          disabled={isLoading}
          onPress={onCapture}
          style={styles.empty}
        >
          <Text style={styles.plus}>＋</Text>
          <Text style={styles.emptyDate}>{dateLabel}</Text>
          <Text style={styles.emptyTitle}>
            {isLoading ? 'Opening your archive…' : 'No Look'}
          </Text>
          <Text style={styles.emptySupporting}>Tap to add this look</Text>
        </Pressable>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    marginHorizontal: spacing.sm,
    marginTop: 0,
    minHeight: 320,
  },
  mediaFrame: {
    flex: 1,
    minHeight: 320,
    overflow: 'hidden',
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  information: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.sm,
  },
  date: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    fontWeight: '400',
    letterSpacing: 1.2,
    lineHeight: lineHeights.caption,
  },
  caption: {
    color: colors.text,
    fontSize: fontSizes.subtitle,
    fontWeight: '600',
    letterSpacing: -0.2,
    lineHeight: lineHeights.subtitle,
    marginTop: spacing.xs,
  },
  empty: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.xl,
  },
  plus: {
    color: colors.text,
    fontSize: 64,
    fontWeight: '200',
    lineHeight: 64,
    marginBottom: spacing.xl,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: fontSizes.action,
    letterSpacing: -1,
    lineHeight: lineHeights.action,
  },
  emptyDate: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    letterSpacing: 1.2,
    lineHeight: lineHeights.caption,
    marginBottom: spacing.xs,
  },
  emptySupporting: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    letterSpacing: 0.8,
    lineHeight: lineHeights.caption,
    marginTop: spacing.sm,
    textTransform: 'uppercase',
  },
  replaceButton: {
    borderBottomColor: colors.text,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: spacing.xs,
  },
  replaceButtonLabel: {
    color: colors.text,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 0.8,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
  },
});
