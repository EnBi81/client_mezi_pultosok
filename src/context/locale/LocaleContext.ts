import { createContext } from 'react';
import { LanguageTranslation } from '../../interfaces/LanguageTranslation';
import { AppLanguage } from '../../interfaces/AppLanguage';

import en from '../../../locales/en.json';

const DefaultSettingsContext = {
  l: en,
  currentLocale: 'en',
  availableLanguages: [],
};

export const LocaleContext = createContext<{
  l: LanguageTranslation;
  currentLocale: string | undefined;
  availableLanguages: AppLanguage[];
}>(DefaultSettingsContext);
