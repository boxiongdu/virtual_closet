import * as ImagePicker from 'expo-image-picker';

export type OutfitImageSource = 'camera' | 'library';

const pickerOptions: ImagePicker.ImagePickerOptions = {
  allowsEditing: false,
  mediaTypes: ['images'],
  quality: 0.9,
};

export async function pickOutfitImage(source: OutfitImageSource) {
  if (source === 'camera') {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      throw new Error('Camera permission is required to take a photo.');
    }

    const result = await ImagePicker.launchCameraAsync(pickerOptions);
    return result.canceled ? undefined : result.assets[0]?.uri;
  }

  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    throw new Error('Photo library permission is required to choose a photo.');
  }

  const result = await ImagePicker.launchImageLibraryAsync(pickerOptions);
  return result.canceled ? undefined : result.assets[0]?.uri;
}
