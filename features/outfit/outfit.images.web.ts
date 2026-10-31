// Browser adapter: Expo FileSystem's native Directory/File APIs are not
// available on web. For this first compatibility increment, inline selected
// images as data URLs. Move blobs to IndexedDB before a public portfolio demo.
export async function persistImage(sourceUri: string, _date: string): Promise<string> {
  if (sourceUri.startsWith('data:image/')) {
    return compressForBrowserStorage(sourceUri);
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

    const dataUrl = await new Promise<string>((resolve, reject) => {
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
    return compressForBrowserStorage(dataUrl);
  }

  throw new Error('Please choose a photo from your browser.');
}

// Keep a single small image compatible with browser AsyncStorage quotas.
// This is deliberately not a replacement for an IndexedDB photo library.
function compressForBrowserStorage(uri: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const photo = new Image();
    photo.onerror = () => reject(new Error('Unable to decode the selected image.'));
    photo.onload = () => {
      const longestSide = Math.max(photo.naturalWidth, photo.naturalHeight);
      if (!longestSide) {
        reject(new Error('Selected image has invalid dimensions.'));
        return;
      }
      const scale = Math.min(1, 1200 / longestSide);
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(photo.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(photo.naturalHeight * scale));
      const context = canvas.getContext('2d');
      if (!context) {
        reject(new Error('Image processing is unavailable in this browser.'));
        return;
      }
      context.drawImage(photo, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.72));
    };
    photo.src = uri;
  });
}

// Web images currently live in the outfit metadata; clearing the metadata
// releases them, and there are no native files to delete.
export function deleteManagedImage(_imageUri: string) {}
export function clearPreReleaseImages() {}
