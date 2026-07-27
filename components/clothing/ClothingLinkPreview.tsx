import { ClothingArchiveConfirmation } from './ClothingArchiveConfirmation';

type ClothingLinkPreviewProps = {
  originalUrl: string;
  resolvedUrl?: string;
  suggestedName?: string;
};

export function ClothingLinkPreview({
  originalUrl,
  resolvedUrl,
  suggestedName,
}: ClothingLinkPreviewProps) {
  return (
    <ClothingArchiveConfirmation
      source={{
        type: 'taobao',
        originalUrl,
        resolvedUrl,
      }}
      suggestedName={suggestedName}
    />
  );
}
