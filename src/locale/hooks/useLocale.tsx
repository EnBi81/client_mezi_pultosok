import { useContext } from 'react';
import { LocaleContext } from '../context_hooks/LocaleContext';

export const useLocale = () => {
  const { currentLocale, availableLanguages, l } = useContext(LocaleContext);

  return {
    l: l,
    currentLocale: currentLocale,
    availableLanguages: availableLanguages,
  };
};
