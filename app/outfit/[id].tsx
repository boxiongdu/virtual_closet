import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OutfitThumbnail } from '../../components/outfit/OutfitThumbnail';
import { useOutfit } from '../../features/outfit/outfit.store';
import { colors, fontSizes, lineHeights, spacing } from '../../lib/theme';

export default function OutfitDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const outfit = useOutfit(id);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backLabel}>← Archive</Text>
      </Pressable>

      {outfit ? (
        <View>
          <OutfitThumbnail outfit={outfit} />
          <Text style={styles.date}>{outfit.date}</Text>
          {outfit.caption ? (
            <Text style={styles.caption}>{outfit.caption}</Text>
          ) : null}
        </View>
      ) : (
        <Text style={styles.caption}>Outfit not found</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  backButton: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    marginBottom: spacing['2xl'],
    minHeight: 44,
  },
  backLabel: {
    color: colors.text,
    fontSize: fontSizes.body,
  },
  date: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    letterSpacing: 1,
    lineHeight: lineHeights.caption,
    marginTop: spacing.xl,
  },
  caption: {
    color: colors.text,
    fontSize: fontSizes.subtitle,
    lineHeight: lineHeights.subtitle,
    marginTop: spacing.sm,
  },
});
