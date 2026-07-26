import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSizes, lineHeights, radii, spacing } from '../../lib/theme';

type OutfitCaptureButtonProps = {
  onPress?: () => void;
};

export function OutfitCaptureButton({ onPress }: OutfitCaptureButtonProps) {
  return (
    <Pressable
      accessibilityHint="Camera capture will be added in a future update"
      accessibilityLabel="Take photo"
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && onPress && styles.pressed,
      ]}
    >
      <Text style={styles.frameLabel}>Daily frame · 01</Text>

      <View style={styles.focus}>
        <Text style={styles.plus}>＋</Text>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.label}>Take Photo</Text>
          <Text style={styles.supporting}>Capture today’s look</Text>
        </View>
        <Text style={styles.arrow}>↗</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 0.74,
    backgroundColor: 'transparent',
    borderColor: colors.text,
    borderRadius: radii.md,
    borderWidth: 1,
    justifyContent: 'center',
    padding: spacing.xl,
    width: '100%',
  },
  pressed: {
    opacity: 0.72,
  },
  frameLabel: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    left: spacing.lg,
    letterSpacing: 1.4,
    lineHeight: lineHeights.caption,
    position: 'absolute',
    textTransform: 'uppercase',
    top: spacing.lg,
  },
  focus: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: StyleSheet.hairlineWidth,
    height: 112,
    justifyContent: 'center',
    width: 112,
    alignSelf: 'center',
  },
  plus: {
    color: colors.text,
    fontSize: 52,
    fontWeight: '200',
    lineHeight: 58,
  },
  footer: {
    alignItems: 'flex-end',
    bottom: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: spacing.xl,
    position: 'absolute',
    right: spacing.xl,
  },
  label: {
    color: colors.text,
    fontSize: fontSizes.action,
    fontWeight: '400',
    letterSpacing: -0.8,
    lineHeight: lineHeights.action,
  },
  supporting: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    letterSpacing: 0.6,
    lineHeight: lineHeights.caption,
    marginTop: spacing.sm,
    textTransform: 'uppercase',
  },
  arrow: {
    color: colors.text,
    fontSize: fontSizes.action,
    fontWeight: '300',
    lineHeight: lineHeights.action,
  },
});
