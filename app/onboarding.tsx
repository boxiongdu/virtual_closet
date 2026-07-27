import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { completeOnboarding } from '../features/onboarding/onboarding.storage';
import { colors, fontSizes, lineHeights, spacing } from '../lib/theme';

export default function OnboardingScreen() {
  const [isStarting, setIsStarting] = useState(false);

  const startArchive = async () => {
    if (isStarting) {
      return;
    }

    setIsStarting(true);
    try {
      await completeOnboarding();
      router.replace('/(tabs)/today');
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>Personal wardrobe archive</Text>
        <View style={styles.message}>
          <Text style={styles.line}>Capture your daily looks.</Text>
          <Text style={styles.line}>Build your closet.</Text>
          <Text style={styles.line}>Remember your style.</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          disabled={isStarting}
          onPress={() => void startArchive()}
          style={styles.startButton}
        >
          <Text style={styles.startLabel}>
            {isStarting ? 'Opening…' : 'Start'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.archiveBackground,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: spacing['2xl'],
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['4xl'],
  },
  eyebrow: {
    color: colors.text,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 1.6,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
  },
  message: {
    gap: spacing.sm,
  },
  line: {
    color: colors.text,
    fontSize: fontSizes.action,
    fontWeight: '400',
    letterSpacing: -0.8,
    lineHeight: lineHeights.action,
  },
  startButton: {
    alignItems: 'center',
    borderTopColor: colors.text,
    borderTopWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    minHeight: 56,
  },
  startLabel: {
    color: colors.text,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 1.4,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
  },
});
