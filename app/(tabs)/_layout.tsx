import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs initialRouteName="closet" screenOptions={{ headerTitleAlign: 'center' }}>
      <Tabs.Screen
        name="closet"
        options={{
          title: 'Closet',
          headerTitle: 'Closet',
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          headerTitle: 'Calendar',
        }}
      />
    </Tabs>
  );
}
