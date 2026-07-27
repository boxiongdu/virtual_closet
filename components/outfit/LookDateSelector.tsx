import { useRef } from 'react';
import {
  FlatList,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, fontSizes, lineHeights, radii, spacing } from '../../lib/theme';

type LookDateSelectorProps = {
  dates: Date[];
  outfitDates: Set<string>;
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

const circleSize = spacing['2xl'] + spacing.sm;
const itemWidth = circleSize;
const itemGap = spacing.md;
const snapInterval = itemWidth + itemGap;

export function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function LookDateSelector({
  dates,
  outfitDates,
  selectedDate,
  onSelectDate,
}: LookDateSelectorProps) {
  const listRef = useRef<FlatList<Date>>(null);
  const todayKey = toDateKey(new Date());

  const selectFromOffset = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / snapInterval,
    );
    const date = dates[Math.max(0, Math.min(index, dates.length - 1))];

    if (date) {
      onSelectDate(toDateKey(date));
    }
  };

  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={dates}
      decelerationRate="fast"
      getItemLayout={(_, index) => ({
        index,
        length: snapInterval,
        offset: snapInterval * index,
      })}
      horizontal
      initialScrollIndex={Math.max(0, dates.length - 8)}
      keyExtractor={toDateKey}
      onMomentumScrollEnd={selectFromOffset}
      ref={listRef}
      renderItem={({ item, index }) => {
        const dateKey = toDateKey(item);
        const selected = selectedDate === dateKey;
        const hasOutfit = outfitDates.has(dateKey);
        const isToday = todayKey === dateKey;

        return (
          <Pressable
            accessibilityLabel={item.toLocaleDateString(undefined, {
              dateStyle: 'full',
            })}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => {
              onSelectDate(dateKey);
              listRef.current?.scrollToIndex({ animated: true, index });
            }}
            style={styles.date}
          >
            <View
              style={[
                styles.circle,
                hasOutfit && styles.dateWithMemory,
                hasOutfit && isToday && styles.dateToday,
                selected && !hasOutfit && styles.dateSelectedEmpty,
              ]}
            >
              <Text style={styles.day}>{item.getDate()}</Text>
            </View>
          </Pressable>
        );
      }}
      showsHorizontalScrollIndicator={false}
      snapToAlignment="start"
      snapToInterval={snapInterval}
      ItemSeparatorComponent={DateSeparator}
    />
  );
}

function DateSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  content: {
    paddingLeft: spacing.md,
    paddingRight: spacing.xl,
  },
  separator: {
    width: itemGap,
  },
  date: {
    alignItems: 'center',
    justifyContent: 'center',
    width: itemWidth,
  },
  dateWithMemory: {
    backgroundColor: colors.memoryArchived,
    borderColor: colors.memoryArchived,
  },
  dateToday: {
    backgroundColor: colors.memoryAccent,
    borderColor: colors.memoryAccent,
  },
  dateSelectedEmpty: {
    borderWidth: 1,
  },
  circle: {
    alignItems: 'center',
    borderColor: colors.text,
    borderRadius: radii.pill,
    borderWidth: StyleSheet.hairlineWidth,
    height: circleSize,
    justifyContent: 'center',
    width: circleSize,
  },
  day: {
    color: colors.text,
    fontSize: fontSizes.body,
    fontWeight: '500',
    lineHeight: lineHeights.body,
  },
});
