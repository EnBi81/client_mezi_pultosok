import { createContext } from 'react';
import { LanguageTranslation } from '../../interfaces/LanguageTranslation';
import { AppLanguage } from '../../interfaces/AppLanguage';
import { localeTranslations } from './locales';

const DefaultSettingsContext = {
  l: localeTranslations.en,
  currentLocale: 'en',
  availableLanguages: [],
};

export const LocaleContext = createContext<{
  l: LanguageTranslation;
  currentLocale: string | undefined;
  availableLanguages: AppLanguage[];
}>(DefaultSettingsContext);
