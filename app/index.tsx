import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { hasCompletedOnboarding } from '../features/onboarding/onboarding.storage';
import { colors } from '../lib/theme';

export default function IndexScreen() {
  const [hasCompleted, setHasCompleted] = useState<boolean>();

  useEffect(() => {
    void hasCompletedOnboarding()
      .then(setHasCompleted)
      .catch(() => setHasCompleted(false));
  }, []);

  if (hasCompleted === undefined) {
    return <View style={{ backgroundColor: colors.archiveBackground, flex: 1 }} />;
  }

  return (
    <Redirect
      href={hasCompleted ? '/(tabs)/today' : '/onboarding'}
    />
  );
}
