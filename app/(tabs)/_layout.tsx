import { Tabs } from 'expo-router';

import { ArchiveTabIcon } from '../../components/shared/ArchiveTabIcon';
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
          tabBarIcon: ({ color }) => (
            <ArchiveTabIcon color={color} name="looks" />
          ),
          title: 'Looks',
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          tabBarIcon: ({ color }) => (
            <ArchiveTabIcon color={color} name="calendar" />
          ),
          title: 'Calendar',
        }}
      />
      <Tabs.Screen
        name="closet"
        options={{
          tabBarIcon: ({ color }) => (
            <ArchiveTabIcon color={color} name="closet" />
          ),
          title: 'Closet',
        }}
      />
    </Tabs>
  );
}
