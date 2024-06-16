import { useContext } from 'react';
import { EnvironmentContext } from '../context/environment/EnvironmentContext';

export const useEnvironment = () => {
  const { isDebug, setDebug } = useContext(EnvironmentContext);

  return {
    isDebug,
    setDebug,
  };
};
