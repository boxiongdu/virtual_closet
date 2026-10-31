// Browser adapter: Expo FileSystem's native Directory/File APIs are not
// available on web. For this first compatibility increment, inline selected
// images as data URLs. Move blobs to IndexedDB before a public portfolio demo.
export async function persistImage(sourceUri: string, _date: string): Promise<string> {
  if (sourceUri.startsWith('data:image/')) {
    return sourceUri;
  }

  if (sourceUri.startsWith('blob:')) {
    const response = await fetch(sourceUri);
    if (!response.ok) {
      throw new Error('Unable to read the selected image.');
    }

    const blob = await response.blob();
    if (!blob.type.startsWith('image/')) {
      throw new Error('Please select an image file.');
    }

    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Unable to read the selected image.'));
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Unable to read the selected image.'));
        }
      };
      reader.readAsDataURL(blob);
    });
  }

  throw new Error('Please choose a photo from your browser.');
}

// Web images currently live in the outfit metadata; clearing the metadata
// releases them, and there are no native files to delete.
export function deleteManagedImage(_imageUri: string) {}
export function clearPreReleaseImages() {}
