import { Platform, ToastAndroid } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

export function toast(text: string) {
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.CENTER);
  } else {
    // Handle iOS or other platforms
    throw new Error('iOS toast not implemented');
  }
}

export function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);

  return { year: d.getUTCFullYear(), weekNo };
}

export function formatString(template, ...args) {
  return template.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] === 'undefined' ? match : args[index];
  });
}

export function getUniqueElements(arr: string[]): string[] {
  const uniqueSet = new Set<string>(arr);
  return Array.from(uniqueSet);
}

export function removeEmptyStrings(arr: string[]) {
  return arr.filter((item) => item.length > 0);
}

export function range(count: number): number[] {
  return [...Array(count).keys()];
}

export function date(ticks: number) {
  const now = () => new Date().getTime();

  return {
    within: {
      last: {
        days: (days: number) => now() - 1000 * 60 * 60 * 24 * days < ticks,
        minutes: (minutes: number) => now() - 1000 * 60 * minutes < ticks,
      },
    },
  };
}

export function clipboard() {
  return {
    set: (text: string) => {
      Clipboard.setString(text);

      return {
        toast: () => {
          const displayText = text.length > 20 ? text.substring(0, 20) + '...' : text;
          toast(`'${displayText}' was copied to clipboard.`);
        },
      };
    },
  };
}
