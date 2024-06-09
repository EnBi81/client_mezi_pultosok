import { Settings } from '../../interfaces/Settings';
import { createContext } from 'react';

export const DefaultSettings: Settings = {
  languageId: undefined,
  colorThemeProps: {
    type: 'user-preference',
    darkTimeFrom: undefined,
    darkTimeTo: undefined,
  },
  locationCache: {
    latitude: undefined,
    longitude: undefined,
    locationAccess: undefined,
  },
  notifications: {
    masterSwitch: false,
    appUpdates: false,
  },
};

const DefaultSettingsContext = {
  settings: DefaultSettings,
  modifySettings: () => {},
};

export const SettingsContext = createContext<{
  settings: Settings;
  modifySettings: (settingsFunc: (oldSettings: Settings) => void) => void;
}>(DefaultSettingsContext);
