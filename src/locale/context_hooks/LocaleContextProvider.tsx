import { LocaleContext } from './LocaleContext';
import { useLocaleContextHook } from './useLocaleContextHook';

export const LocaleContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { currentLocale, l, availableLanguages } = useLocaleContextHook();

  return (
    <LocaleContext.Provider
      value={{
        currentLocale: currentLocale,
        l: l,
        availableLanguages: availableLanguages,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};
