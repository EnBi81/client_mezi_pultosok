import { createContext } from 'react';
import { LanguageTranslation } from '../../interfaces/LanguageTranslation';
import { AppLanguage } from '../../interfaces/AppLanguage';
import { localeTranslations } from './locales';

interface LocaleContextInterface {
  l: LanguageTranslation;
  currentLocale: string | undefined;
  availableLanguages: AppLanguage[];
  fallbackLanguageStatus: {
    isFallbackLanguageUsed: boolean;
    missingCountry: string | undefined;
  };
}

const DefaultSettingsContext: LocaleContextInterface = {
  l: localeTranslations.en,
  currentLocale: 'en',
  availableLanguages: [],
  fallbackLanguageStatus: {
    isFallbackLanguageUsed: false,
    missingCountry: undefined
  }
};

export const LocaleContext = createContext<LocaleContextInterface>(DefaultSettingsContext);
