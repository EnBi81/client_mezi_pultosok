import { Platform, NativeModules } from 'react-native';
import LocalizedString from 'react-native-localization';
import { useEffect, useRef } from 'react';

import en from '../../locales/en.json';
import hu from '../../locales/hu.json';

const languages = {
  en: en,
  hu: hu,
};

export const useLocale = () => {
  const localizedStrings = useRef(new LocalizedString(languages));

  useEffect(() => {
    const devicePrimaryLanguage = getDevicePrimaryLanguage();

    if (devicePrimaryLanguage in languages) {
      localizedStrings.current.setLanguage(devicePrimaryLanguage);
    } else {
      // fallback language
      localizedStrings.current.setLanguage('en');
    }
  }, []);

  return {
    l: localizedStrings.current,
  };
};

function getDevicePrimaryLanguage(): string {
  const locale = Platform.select({
    ios: () =>
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0],
    default: () => NativeModules.I18nManager.localeIdentifier,
  })();
  return locale.replace('-', '_').split('_')[0];
}
