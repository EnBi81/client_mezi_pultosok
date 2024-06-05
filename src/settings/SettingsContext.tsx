import { Settings } from '../interfaces/Settings';
import { createContext, useState } from 'react';

export const DefaultSettings: Settings = {
  languageId: undefined,
};

const DefaultSettingsContext = {
  settings: DefaultSettings,
  modifySettings: () => {},
};

export const SettingsContext = createContext<{
  settings: Settings;
  modifySettings: (settings: Settings) => void;
}>(DefaultSettingsContext);

export const SettingsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, setSettings] = useState<Settings>(DefaultSettings);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        modifySettings: (settings) => setSettings({ ...settings }),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
