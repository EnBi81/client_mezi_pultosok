import { useEffect, useState } from 'react';
import { DefaultSettings } from './SettingsContext';
import { Settings } from '../../interfaces/Settings';
import { storages } from '../../storage/Storages';

export const useSettingsContextHook = () => {
  const storage = storages.settings();
  const [settings, setSettings] = useState<Settings>(DefaultSettings);
  const [isSettingsLoaded, setIsSettingsLoaded] = useState(false);

  // read settings initially
  useEffect(() => {
    storage
      .get()
      .then((data) => {
        if (data === undefined) return;

        const tempSettings: Settings = { ...DefaultSettings };

        if ('languageId' in data) {
          tempSettings.languageId = data.languageId;
        }

        // this was an old settings, if it exists, then assign its value to the new settings
        if ('colorTheme' in data) {
          tempSettings.colorThemeProps.type = data['colorTheme'];
        }

        if ('colorThemeProps' in data) {
          tempSettings.colorThemeProps = data['colorThemeProps'];
        }

        if ('locationCache' in data) {
          tempSettings.locationCache = data['locationCache'];
          // on each restart, set the locationAccess to false
          tempSettings.locationCache.locationAccess = undefined;
        }

        if ('notifications' in data) {
          tempSettings.notifications = data['notifications'];
        }

        if (JSON.stringify(settings) !== JSON.stringify(tempSettings)) {
          setSettings(tempSettings);
        }
      })
      .then(() => setIsSettingsLoaded(true))
      .catch(() => setIsSettingsLoaded(true));
  }, []);

  const modifySettingsCache = (settings: Settings) => {
    const newSettings = { ...settings };

    setSettings(newSettings);
    storage.store(newSettings).catch((err) => console.error('Failed to save settings: ', err));
  };

  return {
    settings: settings,
    isSettingsLoaded: isSettingsLoaded,
    modifySettings: modifySettingsCache,
  };
};
