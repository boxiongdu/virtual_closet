import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Outfit } from '../../features/outfit/outfit.types';
import { colors, fontSizes, lineHeights, spacing } from '../../lib/theme';
import { OutfitThumbnail } from './OutfitThumbnail';

type CalendarViewProps = {
  month: Date;
  outfits: Outfit[];
};

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function CalendarView({ month, outfits }: CalendarViewProps) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstWeekDay = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells = Array.from({ length: 42 }, (_, index) => {
    const day = index - firstWeekDay + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });
  const weeks = Array.from({ length: 6 }, (_, index) =>
    cells.slice(index * 7, index * 7 + 7),
  );

  return (
    <View style={styles.container}>
      <View style={styles.weekRow}>
        {weekDays.map((day, index) => (
          <Text key={`${day}-${index}`} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {weeks.map((week, weekIndex) => (
          <View key={`week-${weekIndex}`} style={styles.week}>
            {week.map((day, dayIndex) => {
              const outfit = day
                ? outfits.find(
                    (item) => item.date === toDateKey(year, monthIndex, day),
                  )
                : undefined;

              return (
                <Pressable
                  accessibilityLabel={
                    outfit ? `Open outfit from ${outfit.date}` : undefined
                  }
                  accessibilityRole={outfit ? 'button' : undefined}
                  disabled={!outfit}
                  key={`${day ?? 'empty'}-${dayIndex}`}
                  onPress={() => {
                    if (outfit) {
                      router.push({
                        pathname: '/outfit/[id]',
                        params: { id: outfit.id },
                      });
                    }
                  }}
                  style={styles.dayCell}
                >
                  {day ? <Text style={styles.dayNumber}>{day}</Text> : null}
                  {outfit ? (
                    <View style={styles.thumbnail}>
                      <OutfitThumbnail compact outfit={outfit} />
                    </View>
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weekRow: {
    flexDirection: 'row',
    paddingBottom: spacing.md,
  },
  weekDay: {
    color: colors.textMuted,
    flex: 1,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 1,
    lineHeight: lineHeights.caption,
    textAlign: 'center',
  },
  grid: {
    flex: 1,
  },
  week: {
    flex: 1,
    flexDirection: 'row',
  },
  dayCell: {
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    flex: 1,
    overflow: 'hidden',
    paddingHorizontal: spacing.xs,
    paddingTop: spacing.sm,
  },
  dayNumber: {
    color: colors.text,
    fontSize: fontSizes.caption,
    lineHeight: lineHeights.caption,
    textAlign: 'center',
  },
  thumbnail: {
    alignSelf: 'center',
    flex: 1,
    marginTop: spacing.xs,
    width: '86%',
  },
});
