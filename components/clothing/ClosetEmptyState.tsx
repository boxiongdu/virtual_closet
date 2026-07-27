import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSizes, lineHeights, spacing } from '../../lib/theme';

type ClosetEmptyStateProps = {
  onAdd: () => void;
};

export function ClosetEmptyState({ onAdd }: ClosetEmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your closet is empty.</Text>
      <Text style={styles.supporting}>Start building your archive.</Text>
      <Pressable
        accessibilityRole="button"
        onPress={onAdd}
        style={styles.action}
      >
        <Text style={styles.actionLabel}>Add your first piece →</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    minHeight: 360,
    paddingVertical: spacing['3xl'],
  },
  title: {
    color: colors.text,
    fontSize: fontSizes.subtitle,
    lineHeight: lineHeights.subtitle,
  },
  supporting: {
    color: colors.textMuted,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    marginTop: spacing.sm,
  },
  action: {
    alignSelf: 'flex-start',
    borderBottomColor: colors.text,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    marginTop: spacing['2xl'],
    minHeight: 40,
  },
  actionLabel: {
    color: colors.text,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 0.8,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
  },
});
