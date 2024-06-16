import { useState } from 'react';

export const useEnvironmentContextHook = () => {
  const [environment, setEnvironment] = useState<'debug' | 'prod'>('prod');

  return {
    isDebug: environment === 'debug',
    setDebug: () => setEnvironment('debug'),
  };
};
