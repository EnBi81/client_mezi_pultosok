import { Platform, NativeModules } from 'react-native';
import LocalizedString from 'react-native-localization';
import { useEffect, useRef, useState } from 'react';
import { AppLanguage } from '../interfaces/AppLanguage';
import Icon from 'react-native-ico-flags';

import en from '../../locales/en.json';
import hu from '../../locales/hu.json';
import { useSettings } from './useSettings';

type LanguageCollection = {
  [key: string]: {
    id: string;
    name: string;
    flag: React.ReactNode;
    translates: any;
  };
};

const languages: LanguageCollection = {
  en: {
    id: 'en',
    name: 'English',
    flag: <Icon name={'united-kingdom'} />,
    translates: en,
  },
  hu: {
    id: 'hu',
    name: 'Magyar',
    flag: <Icon name={'hungary'} />,
    translates: hu,
  },
};

const locales = Object.keys(languages).reduce((acc, key) => {
  const { id, translates } = languages[key];
  acc[id] = translates;
  return acc;
}, {});

const availableLanguages: AppLanguage[] = Object.keys(languages).map((k) => ({
  id: languages[k].id,
  name: languages[k].name,
  icon: languages[k].flag,
}));

export const useLocale = () => {
  const localizedStrings = useRef(new LocalizedString(locales));
  const { settings } = useSettings();

  useEffect(() => {
    const savedLanguageId = settings.languageId;

    // if we have a valid saved language then choose that
    if (savedLanguageId && savedLanguageId in languages) {
      localizedStrings.current.setLanguage(savedLanguageId);
      return;
    }

    // otherwise, get the device default
    const devicePrimaryLanguage = getDevicePrimaryLanguage();
    if (devicePrimaryLanguage in languages) {
      localizedStrings.current.setLanguage(devicePrimaryLanguage);
    } else {
      // fallback language
      localizedStrings.current.setLanguage(languages.en.id);
    }
  }, [settings.languageId]);

  return {
    l: localizedStrings.current,
    availableLanguages: availableLanguages,
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
