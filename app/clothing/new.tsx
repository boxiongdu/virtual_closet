import { useLocalSearchParams } from 'expo-router';

import { ClothingArchiveConfirmation } from '../../components/clothing/ClothingArchiveConfirmation';

export default function NewClothingScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri?: string }>();

  return (
    <ClothingArchiveConfirmation
      imageUri={imageUri}
      source={{ type: 'photo' }}
    />
  );
}
