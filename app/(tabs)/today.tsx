import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OutfitCaptureButton } from '../../components/outfit/OutfitCaptureButton';
import { OutfitThumbnail } from '../../components/outfit/OutfitThumbnail';
import { useOutfits } from '../../features/outfit/outfit.store';
import { colors, fontSizes, lineHeights, spacing } from '../../lib/theme';

export default function TodayScreen() {
  const recentOutfits = useOutfits().slice(0, 3);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Personal style journal</Text>
          <Text style={styles.title}>Today’s Look</Text>
        </View>

        <OutfitCaptureButton />

        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent looks</Text>
            <Text style={styles.sectionIndex}>
              {String(recentOutfits.length).padStart(2, '0')}
            </Text>
          </View>
          {recentOutfits.length ? (
            <ScrollView
              contentContainerStyle={styles.recentRow}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {recentOutfits.map((outfit) => (
                <OutfitThumbnail archive key={outfit.id} outfit={outfit} />
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.emptyText}>Your style story starts here.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing['4xl'] * 2,
    paddingHorizontal: spacing.xl,
  },
  header: {
    paddingBottom: spacing['2xl'],
    paddingTop: spacing['3xl'],
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
  recentSection: {
    paddingTop: spacing['2xl'],
  },
  sectionHeader: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 1.2,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
  },
  sectionIndex: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    lineHeight: lineHeights.caption,
  },
  recentRow: {
    gap: spacing.sm,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
  },
});
