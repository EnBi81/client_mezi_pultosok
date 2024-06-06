import { useSettingsContextHook } from './useSettingsContextHook';
import { SettingsContext } from './SettingsContext';

export const SettingsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { settings, modifySettings, isSettingsLoaded } =
    useSettingsContextHook();

  return (
    <SettingsContext.Provider
      value={{
        settings,
        modifySettings: (settings) => modifySettings({ ...settings }),
      }}
    >
      {isSettingsLoaded && children}
    </SettingsContext.Provider>
  );
};
