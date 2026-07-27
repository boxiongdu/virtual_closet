import { useLocalSearchParams } from 'expo-router';

import { ClothingLinkPreview } from '../../components/clothing/ClothingLinkPreview';

export default function ClothingImportPreviewScreen() {
  const { originalUrl = '', resolvedUrl, suggestedName } =
    useLocalSearchParams<{
    originalUrl?: string;
    resolvedUrl?: string;
    suggestedName?: string;
  }>();

  return (
    <ClothingLinkPreview
      originalUrl={originalUrl}
      resolvedUrl={resolvedUrl}
      suggestedName={suggestedName}
    />
  );
}
