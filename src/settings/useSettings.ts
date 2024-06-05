import { useContext } from 'react';
import { SettingsContext } from './SettingsContext';

export const useSettings = () => {
  const { settings, modifySettings } = useContext(SettingsContext);

  return {
    settings: settings,
    modifySettings: modifySettings,
  };
};
