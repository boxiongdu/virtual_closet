import { useLocalSearchParams } from 'expo-router';

import { ClothingArchiveConfirmation } from '../../components/clothing/ClothingArchiveConfirmation';
import { resolveImageFromNavigation } from '../../features/outfit/outfit.pending-image';

export default function NewClothingScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri?: string }>();

  return (
    <ClothingArchiveConfirmation
      imageUri={resolveImageFromNavigation(imageUri)}
      source={{ type: 'photo' }}
    />
  );
}
