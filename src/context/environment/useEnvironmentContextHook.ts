import { useState } from 'react';

export const useEnvironmentContextHook = () => {
  const [environment, setEnvironment] = useState<'debug' | 'prod'>(__DEV__ ? 'debug' : 'prod');

  return {
    isDebug: environment === 'debug',
    setDebug: () => setEnvironment('debug'),
  };
};
