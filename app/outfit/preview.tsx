import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { OutfitPreview } from '../../components/outfit/OutfitPreview';
import { resolveImageFromNavigation } from '../../features/outfit/outfit.pending-image';

export default function OutfitPreviewScreen() {
  const { date, imageUri } = useLocalSearchParams<{
    date: string;
    imageUri: string;
  }>();

  const resolvedImageUri = resolveImageFromNavigation(imageUri);
  if (!resolvedImageUri) {
    // The browser page may have been refreshed during a temporary preview.
    return <OutfitPreviewUnavailable />;
  }

  return <OutfitPreview date={date} imageUri={resolvedImageUri} />;
}

function OutfitPreviewUnavailable() {
  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text>Selected photo is no longer available.</Text>
      <Pressable accessibilityRole="button" onPress={() => router.replace('/(tabs)/today')} style={{ padding: 20 }}>
        <Text>Choose another photo</Text>
      </Pressable>
    </View>
  );
}
