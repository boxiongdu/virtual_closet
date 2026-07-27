import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { resetDemoData } from '../../lib/resetDemoData';
import { colors, fontSizes, lineHeights, spacing } from '../../lib/theme';

export function DeveloperBar() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const confirmReset = () => {
    Alert.alert(
      'Reset demo data?',
      'This clears all Looks, Closet items, and onboarding progress.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            if (isResetting) {
              return;
            }

            setIsResetting(true);
            void resetDemoData()
              .then(() => router.replace('/onboarding'))
              .catch(() => {
                setIsResetting(false);
                Alert.alert('Reset failed', 'Please try again.');
              });
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityHint="Long press to unlock developer actions"
        accessibilityLabel="Developer bar"
        delayLongPress={1200}
        onLongPress={() => setIsUnlocked(true)}
        style={styles.bar}
      >
        <Text style={styles.barLabel}>Developer</Text>
      </Pressable>

      {isUnlocked ? (
        <Pressable
          accessibilityRole="button"
          disabled={isResetting}
          onPress={confirmReset}
          style={styles.resetAction}
        >
          <Text style={styles.resetLabel}>
            {isResetting ? 'Resetting…' : 'Reset Demo Data'}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing['4xl'],
  },
  bar: {
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    minHeight: 44,
  },
  barLabel: {
    color: colors.border,
    fontSize: fontSizes.caption,
    letterSpacing: 1,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
  },
  resetAction: {
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    minHeight: 48,
  },
  resetLabel: {
    color: colors.accent,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 1,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
  },
});
