import { Settings } from '../interfaces/Settings';
import { createContext, useState } from 'react';
import { useSettingsContextHook } from './useSettingsContextHook';

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
  const { settings, modifySettings } = useSettingsContextHook();

  return (
    <SettingsContext.Provider
      value={{
        settings,
        modifySettings: (settings) => modifySettings({ ...settings }),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
