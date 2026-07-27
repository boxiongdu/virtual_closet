import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fontSizes, lineHeights, spacing } from '../../lib/theme';

type ClothingAddSheetProps = {
  onCamera: () => void;
  onClose: () => void;
  onImportLink: () => void;
  onLibrary: () => void;
  visible: boolean;
};

export function ClothingAddSheet({
  onCamera,
  onClose,
  onImportLink,
  onLibrary,
  visible,
}: ClothingAddSheetProps) {
  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <Pressable
        accessibilityLabel="Close add clothing options"
        onPress={onClose}
        style={styles.backdrop}
      />
      <SafeAreaView edges={['bottom']} style={styles.sheet}>
        <View style={styles.heading}>
          <Text style={styles.eyebrow}>New archive piece</Text>
          <Text style={styles.title}>Add clothing</Text>
        </View>

        <SheetAction label="Take Photo" onPress={onCamera} />
        <SheetAction label="Upload Photo" onPress={onLibrary} />
        <SheetAction label="Add from Taobao" onPress={onImportLink} />

        <Pressable
          accessibilityRole="button"
          onPress={onClose}
          style={styles.cancel}
        >
          <Text style={styles.cancelLabel}>Cancel</Text>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}

type SheetActionProps = {
  label: string;
  onPress: () => void;
};

function SheetAction({ label, onPress }: SheetActionProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.action,
        pressed && styles.actionPressed,
      ]}
    >
      <Text style={styles.actionLabel}>{label}</Text>
      <Text style={styles.arrow}>→</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(23, 23, 23, 0.3)',
    flex: 1,
  },
  sheet: {
    backgroundColor: colors.archiveBackground,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  heading: {
    paddingBottom: spacing.xl,
    paddingTop: spacing['2xl'],
  },
  eyebrow: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 1.2,
    lineHeight: lineHeights.caption,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: fontSizes.action,
    letterSpacing: -0.8,
    lineHeight: lineHeights.action,
  },
  action: {
    alignItems: 'center',
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 56,
  },
  actionPressed: {
    opacity: 0.55,
  },
  actionLabel: {
    color: colors.text,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
  },
  arrow: {
    color: colors.textMuted,
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
  },
  cancel: {
    alignItems: 'center',
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    minHeight: 56,
  },
  cancelLabel: {
    color: colors.textMuted,
    fontSize: fontSizes.caption,
    fontWeight: '600',
    letterSpacing: 1,
    lineHeight: lineHeights.caption,
    textTransform: 'uppercase',
  },
});
