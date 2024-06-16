import { createContext } from 'react';

interface EnvironmentContextInterface {
  isDebug: boolean;
  setDebug: () => void;
}

const EnvironmentContextDefaultValue: EnvironmentContextInterface = {
  isDebug: false,
  setDebug: () => {},
};

export const EnvironmentContext = createContext<EnvironmentContextInterface>(EnvironmentContextDefaultValue);
