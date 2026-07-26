import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CalendarView } from '../../components/outfit/CalendarView';
import { useOutfits } from '../../features/outfit/outfit.store';
import { colors, fontSizes, lineHeights, spacing } from '../../lib/theme';

export default function CalendarScreen() {
  const month = new Date();
  const outfits = useOutfits();
  const monthLabel = month.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Style archive</Text>
          <Text style={styles.title}>{monthLabel}</Text>
        </View>
        <CalendarView month={month} outfits={outfits} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingBottom: spacing['4xl'] + spacing['2xl'],
    paddingHorizontal: spacing.lg,
  },
  header: {
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.sm,
    paddingTop: spacing['2xl'],
  },
  eyebrow: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 1.4,
    lineHeight: lineHeights.caption,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: fontSizes.title,
    fontWeight: '400',
    letterSpacing: -1.2,
    lineHeight: lineHeights.title,
  },
});
