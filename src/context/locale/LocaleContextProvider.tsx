import { LocaleContext } from './LocaleContext';
import { useLocaleContextHook } from './useLocaleContextHook';

export const LocaleContextProvider = ({ children }: { children: React.ReactNode }) => {
  const context = useLocaleContextHook();

  return <LocaleContext.Provider value={context}>{children}</LocaleContext.Provider>;
};
