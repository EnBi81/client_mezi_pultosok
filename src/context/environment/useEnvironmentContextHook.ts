import { useState } from 'react';
import { IS_DEBUG_BY_DEFAULT } from '../../utils/constants';

export const useEnvironmentContextHook = () => {
  const [environment, setEnvironment] = useState<'debug' | 'prod'>(IS_DEBUG_BY_DEFAULT ? 'debug' : 'prod');

  return {
    isDebug: environment === 'debug',
    setDebug: () => setEnvironment('debug'),
  };
};
