import { Platform, ToastAndroid } from 'react-native';

export function capitalizeFirstLetter(str: string) {
  if (str.length === 0) return str;
  if (str.length === 1) return str.toUpperCase();

  return str[0].toUpperCase() + str.slice(1);
}

export function toast(text: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.CENTER);
  } else {
    // Handle iOS or other platforms
    throw new Error('iOS toast not implemented');
  }
}
