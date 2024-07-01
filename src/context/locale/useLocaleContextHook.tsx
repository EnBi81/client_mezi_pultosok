import LocalizedString from 'react-native-localization';
import { useEffect, useRef, useState } from 'react';
import { AppLanguage } from '../../interfaces/AppLanguage';
import Icon from 'react-native-ico-flags';
import { useSettings } from '../../hooks/useSettings';
import { LanguageTranslation } from '../../interfaces/LanguageTranslation';
import { toast } from '../../utils/utils';
import { getDevicePrimaryLanguage, localeTranslations } from './locales';

// noinspection RequiredAttributes
const languages = {
  en: {
    id: 'en',
    locale: 'en-US',
    name: 'English',
    flag: <Icon name={'united-kingdom'} />,
    translates: localeTranslations.en,
  },
  hu: {
    id: 'hu',
    locale: 'hu-HU',
    name: 'Magyar',
    flag: <Icon name={'hungary'} />,
    translates: localeTranslations.hu,
  },
};

// store the translations
const locales: LanguageCollection = Object.keys(languages).reduce((acc, key) => {
  const { id, translates } = languages[key];
  acc[id] = translates;
  return acc;
}, {});

// store the available languages to display them for the user
const availableLanguages: AppLanguage[] = Object.keys(languages).map((k) => ({
  id: languages[k].id,
  name: languages[k].name,
  icon: languages[k].flag,
}));

export const useLocaleContextHook = () => {
  const localizedStrings = useRef(new LocalizedString(locales));
  const { settings } = useSettings();
  const [translation, setTranslation] = useState<LanguageTranslation>(languages.en.translates);
  const [currentLocale, setCurrentLocale] = useState<string>();
  const [fallbackLanguageStatus, setFallbackLanguageStatus] = useState({
    isFallbackLanguageUsed: false,
    missingCountry: undefined
  });

  useEffect(() => {
    const savedLanguageId = settings.languageId;

    // if we have a valid saved language then choose that
    if (savedLanguageId && savedLanguageId in languages) {
      localizedStrings.current.setLanguage(savedLanguageId);
      setTranslation({ ...localizedStrings.current });
      setCurrentLocale(languages[savedLanguageId].locale);
      setFallbackLanguageStatus({
        isFallbackLanguageUsed: false,
        missingCountry: undefined
      })
      return;
    }

    // otherwise, get the device default
    const devicePrimaryLanguage = getDevicePrimaryLanguage();

    if (devicePrimaryLanguage.countryCode in languages) {
      localizedStrings.current.setLanguage(devicePrimaryLanguage.countryCode);
      setTranslation({ ...localizedStrings.current });
      setCurrentLocale(devicePrimaryLanguage.locale);
      setFallbackLanguageStatus({
        isFallbackLanguageUsed: false,
        missingCountry: undefined
      })
    } else {
      const fallbackLanguage = languages.en;

      localizedStrings.current.setLanguage(fallbackLanguage.id);
      setTranslation({ ...localizedStrings.current });
      setCurrentLocale(fallbackLanguage.locale);

      setFallbackLanguageStatus({
        isFallbackLanguageUsed: true,
        missingCountry: devicePrimaryLanguage.countryCode
      });
    }
  }, [settings.languageId]);

  return {
    l: translation,
    currentLocale: currentLocale,
    availableLanguages: availableLanguages,
    fallbackLanguageStatus: fallbackLanguageStatus
  };
};

type LanguageCollection = {
  [key: string]: LanguageTranslation;
};
