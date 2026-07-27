import { StyleSheet, View } from 'react-native';

type ArchiveTabIconProps = {
  color: string;
  name: 'looks' | 'calendar' | 'closet';
};

export function ArchiveTabIcon({ color, name }: ArchiveTabIconProps) {
  if (name === 'looks') {
    return (
      <View style={styles.icon}>
        <View style={[styles.camera, { borderColor: color }]}>
          <View style={[styles.lens, { borderColor: color }]} />
        </View>
        <View style={[styles.cameraTop, { borderColor: color }]} />
      </View>
    );
  }

  if (name === 'calendar') {
    return (
      <View style={styles.icon}>
        <View style={[styles.calendar, { borderColor: color }]}>
          <View style={[styles.calendarRule, { backgroundColor: color }]} />
        </View>
        <View style={[styles.calendarRingLeft, { backgroundColor: color }]} />
        <View style={[styles.calendarRingRight, { backgroundColor: color }]} />
      </View>
    );
  }

  return (
    <View style={styles.icon}>
      <View style={[styles.hangerHook, { borderColor: color }]} />
      <View style={[styles.hangerStem, { backgroundColor: color }]} />
      <View style={[styles.hangerLeft, { backgroundColor: color }]} />
      <View style={[styles.hangerRight, { backgroundColor: color }]} />
      <View style={[styles.hangerBase, { backgroundColor: color }]} />
    </View>
  );
}

const stroke = StyleSheet.hairlineWidth;

const styles = StyleSheet.create({
  icon: {
    height: 24,
    position: 'relative',
    width: 24,
  },
  camera: {
    alignItems: 'center',
    borderWidth: stroke,
    height: 15,
    justifyContent: 'center',
    left: 2,
    position: 'absolute',
    top: 6,
    width: 20,
  },
  cameraTop: {
    borderBottomWidth: stroke,
    borderLeftWidth: stroke,
    borderRightWidth: stroke,
    height: 3,
    left: 8,
    position: 'absolute',
    top: 3,
    width: 8,
  },
  lens: {
    borderRadius: 4,
    borderWidth: stroke,
    height: 7,
    width: 7,
  },
  calendar: {
    borderWidth: stroke,
    height: 18,
    left: 3,
    position: 'absolute',
    top: 4,
    width: 18,
  },
  calendarRule: {
    height: stroke,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 5,
  },
  calendarRingLeft: {
    height: 5,
    left: 8,
    position: 'absolute',
    top: 2,
    width: stroke,
  },
  calendarRingRight: {
    height: 5,
    position: 'absolute',
    right: 8,
    top: 2,
    width: stroke,
  },
  hangerHook: {
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRadius: 5,
    borderWidth: stroke,
    height: 8,
    left: 9,
    position: 'absolute',
    top: 1,
    width: 7,
  },
  hangerStem: {
    height: 4,
    left: 12,
    position: 'absolute',
    top: 8,
    width: stroke,
  },
  hangerLeft: {
    height: stroke,
    left: 2,
    position: 'absolute',
    top: 15,
    transform: [{ rotate: '-28deg' }],
    width: 12,
  },
  hangerRight: {
    height: stroke,
    position: 'absolute',
    right: 2,
    top: 15,
    transform: [{ rotate: '28deg' }],
    width: 12,
  },
  hangerBase: {
    bottom: 3,
    height: stroke,
    left: 2,
    position: 'absolute',
    width: 20,
  },
});
