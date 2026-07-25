import { useLocalSearchParams } from 'expo-router';

import { ClothingDetail } from '../../components/clothing/ClothingDetail';

export default function ClothingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <ClothingDetail id={id} />;
}
