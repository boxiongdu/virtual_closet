import { Tabs } from 'expo-router';

import { colors, fontSizes, radii, spacing } from '../../lib/theme';

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="today"
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: colors.background,
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: fontSizes.caption,
          fontWeight: '600',
          letterSpacing: 1.2,
          textTransform: 'uppercase',
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: radii.lg,
          borderTopWidth: 1,
          height: 72,
          marginBottom: spacing.md,
          marginHorizontal: spacing.lg,
          paddingBottom: spacing.md,
          paddingTop: spacing.md,
          position: 'absolute',
        },
      }}
    >
      <Tabs.Screen
        name="today"
        options={{
          title: 'Today',
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
        }}
      />
      <Tabs.Screen
        name="closet"
        options={{
          title: 'Closet',
        }}
      />
    </Tabs>
  );
}
