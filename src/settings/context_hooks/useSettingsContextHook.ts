import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { DefaultSettings } from './SettingsContext';
import { Settings } from '../../interfaces/Settings';
import { Appearance } from 'react-native';

export const useSettingsContextHook = () => {
  const settingsKey = 'settings-key';
  const [settings, setSettings] = useState<Settings>(DefaultSettings);

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem(settingsKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  const storeData = async (value) => {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(settingsKey, jsonValue);
  };

  // read settings initially
  useEffect(() => {
    getData().then((data) => {
      if (data == null) return;

      const tempSettings: Settings = { ...DefaultSettings };

      if ('languageId' in data) {
        tempSettings.languageId = data.languageId;
      }

      if ('colorTheme' in data) {
        tempSettings.colorTheme = data['colorTheme'];
      }

      if (JSON.stringify(settings) !== JSON.stringify(tempSettings)) {
        setSettings(tempSettings);
      }
    });
  }, []);

  const modifySettingsCache = (settings: Settings) => {
    const newSettings = { ...settings };

    storeData(newSettings)
      .then(() => {
        setSettings(newSettings);
      })
      .catch((err) => console.error('Failed to save settings: ', err));
  };

  // set color theme
  useEffect(() => {
    if (settings.colorTheme === 'light') {
      Appearance.setColorScheme('light');
    }
    if (settings.colorTheme === 'dark') {
      Appearance.setColorScheme('dark');
    }
    if (settings.colorTheme === 'user-preference') {
      Appearance.setColorScheme(null);
    }
  }, [settings.colorTheme]);

  return {
    settings: settings,
    modifySettings: modifySettingsCache,
  };
};
