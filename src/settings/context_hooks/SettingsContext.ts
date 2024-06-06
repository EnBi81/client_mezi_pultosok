import { Settings } from '../../interfaces/Settings';
import { createContext } from 'react';

export const DefaultSettings: Settings = {
  languageId: undefined,
  colorTheme: 'user-preference',
};

const DefaultSettingsContext = {
  settings: DefaultSettings,
  modifySettings: () => {},
};

export const SettingsContext = createContext<{
  settings: Settings;
  modifySettings: (settings: Settings) => void;
}>(DefaultSettingsContext);
