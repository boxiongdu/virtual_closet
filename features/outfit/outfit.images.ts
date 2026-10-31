import { Directory, File, Paths } from 'expo-file-system';

// Native adapter: keep existing device-managed photo behavior unchanged.
const outfitDirectory = new Directory(Paths.document, 'outfits');

export function persistImage(sourceUri: string, date: string): Promise<string> {
  outfitDirectory.create({ idempotent: true, intermediates: true });

  const source = new File(sourceUri);
  const extension = source.extension || '.jpg';
  const destination = new File(
    outfitDirectory,
    `${date}-${Date.now()}${extension}`,
  );

  source.copy(destination);
  return Promise.resolve(destination.uri);
}

export function deleteManagedImage(imageUri: string) {
  if (!imageUri.startsWith(outfitDirectory.uri)) {
    return;
  }

  const image = new File(imageUri);
  if (image.exists) {
    try {
      image.delete();
    } catch {
      // A missing/orphaned image must not prevent record updates.
    }
  }
}

export function clearPreReleaseImages() {
  if (!outfitDirectory.exists) {
    return;
  }

  try {
    outfitDirectory.delete();
  } catch {
    // Metadata migration remains valid even if cleanup cannot remove files.
  }
}
