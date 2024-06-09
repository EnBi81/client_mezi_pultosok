import { Platform, ToastAndroid } from 'react-native';

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
