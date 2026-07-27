import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LookCanvas } from '../../components/outfit/LookCanvas';
import { OutfitCaptureSheet } from '../../components/outfit/OutfitCaptureSheet';
import {
  LookDateSelector,
  toDateKey,
} from '../../components/outfit/LookDateSelector';
import { getLookNumber } from '../../features/outfit/outfit.logic';
import { useOutfitStore } from '../../features/outfit/outfit.store';
import { colors, fontSizes, lineHeights, spacing } from '../../lib/theme';

export default function TodayScreen() {
  const { isHydrated, outfits } = useOutfitStore();
  const [isCaptureOpen, setIsCaptureOpen] = useState(false);
  const dates = useMemo(
    () =>
      Array.from({ length: 22 }, (_, index) => {
        const date = new Date();
        date.setHours(12, 0, 0, 0);
        date.setDate(date.getDate() + index - 14);
        return date;
      }),
    [],
  );
  const [selectedDate, setSelectedDate] = useState(toDateKey(new Date()));
  const selectedDateValue =
    dates.find((date) => toDateKey(date) === selectedDate) ?? new Date();
  const selectedOutfit = outfits.find(
    (outfit) => outfit.date === selectedDate,
  );
  const dateLabel = formatArchiveDate(selectedDateValue);
  const lookNumber = selectedOutfit
    ? getLookNumber(outfits, selectedOutfit.id)
    : undefined;

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Personal lookbook</Text>
          <View style={styles.headerRow}>
            <Text style={styles.title}>LOOKS</Text>
            <View style={styles.dateNavigation}>
              <LookDateSelector
                dates={dates}
                onSelectDate={setSelectedDate}
                outfitDates={new Set(outfits.map((outfit) => outfit.date))}
                selectedDate={selectedDate}
              />
            </View>
          </View>
        </View>

        <LookCanvas
          dateLabel={dateLabel}
          isLoading={!isHydrated}
          lookNumber={lookNumber}
          onCapture={() => setIsCaptureOpen(true)}
          outfit={selectedOutfit}
        />
      </View>

      <OutfitCaptureSheet
        date={selectedDate}
        onClose={() => setIsCaptureOpen(false)}
        visible={isCaptureOpen}
      />
    </SafeAreaView>
  );
}

function formatArchiveDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${month}.${day}.${date.getFullYear()}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.archiveBackground,
  },
  content: {
    flex: 1,
    paddingBottom: spacing['4xl'] + spacing['2xl'],
  },
  header: {
    paddingBottom: spacing.xs,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  dateNavigation: {
    flex: 1,
    height: spacing['3xl'],
  },
  eyebrow: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 1.4,
    lineHeight: lineHeights.caption,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: fontSizes.title,
    fontWeight: '700',
    letterSpacing: -2,
    lineHeight: lineHeights.title,
  },
});
