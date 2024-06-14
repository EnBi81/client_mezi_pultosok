import en from '../../../locales/en.json';
import hu from '../../../locales/hu.json';

import { Settings } from '../../interfaces/Settings';
import { NativeModules, Platform } from 'react-native';
import { LanguageTranslation } from '../../interfaces/LanguageTranslation';

export const localeTranslations: { en: LanguageTranslation; hu: LanguageTranslation } = {
  en: en,
  hu: hu,
};

export const getCurrentLocalTranslations = (settings: Settings | undefined): LanguageTranslation => {
  if (settings) {
    const savedLanguageId = settings?.languageId;

    // if we have a valid saved language then choose that
    if (savedLanguageId && savedLanguageId in localeTranslations) {
      return localeTranslations[savedLanguageId];
    }
  }

  // otherwise, get the device default
  const devicePrimaryLanguage = getDevicePrimaryLanguage();

  if (devicePrimaryLanguage.countryCode in localeTranslations) {
    return localeTranslations[devicePrimaryLanguage.countryCode];
  } else {
    return localeTranslations['en'];
  }
};

export function getDevicePrimaryLanguage() {
  const locale = Platform.select({
    ios: () =>
      NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0],
    default: () => NativeModules.I18nManager.localeIdentifier,
  })();

  return {
    locale: locale.replace('_', '-'),
    countryCode: locale.replace('-', '_').split('_')[0],
  };
}
