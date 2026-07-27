import AsyncStorage from '@react-native-async-storage/async-storage';

const onboardingKey = '@virtual-closet/has-completed-onboarding';

export async function hasCompletedOnboarding() {
  return (await AsyncStorage.getItem(onboardingKey)) === 'true';
}

export async function completeOnboarding() {
  await AsyncStorage.setItem(onboardingKey, 'true');
}

export async function resetOnboarding() {
  await AsyncStorage.removeItem(onboardingKey);
}
