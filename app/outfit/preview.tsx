import { useLocalSearchParams } from 'expo-router';

import { OutfitPreview } from '../../components/outfit/OutfitPreview';

export default function OutfitPreviewScreen() {
  const { date, imageUri } = useLocalSearchParams<{
    date: string;
    imageUri: string;
  }>();

  return <OutfitPreview date={date} imageUri={imageUri} />;
}
