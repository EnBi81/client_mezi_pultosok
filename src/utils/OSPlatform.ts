import { Platform } from 'react-native';

export const OSPlatform = {
  is: {
    ios: Platform.OS === 'ios',
    android: Platform.OS === 'android',
  },
  select<T>(task: PlatformSpecificTask<T>): T {
    if (Platform.OS === 'android') {
      return task.android;
    } else if (Platform.OS === 'ios') {
      return task.ios;
    }

    throw new Error('Platform not implemented: ' + Platform.OS);
  },
};

interface PlatformSpecificTask<T> {
    android: T;
    ios: T;
} 