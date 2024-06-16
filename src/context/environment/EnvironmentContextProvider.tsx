import { EnvironmentContext } from './EnvironmentContext';
import { useEnvironmentContextHook } from './useEnvironmentContextHook';

export const EnvironmentContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { isDebug, setDebug } = useEnvironmentContextHook();

  return <EnvironmentContext.Provider value={{ isDebug, setDebug }}>{children}</EnvironmentContext.Provider>;
};
