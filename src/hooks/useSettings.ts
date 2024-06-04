import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings } from '../interfaces/Settings';
import { useEffect, useState } from 'react';

export const useSettings = () => {
  const settingsKey = 'settings-key';

  const defaultSettings: Settings = {
    languageId: undefined,
  };

  const [settings, setSettings] = useState<Settings>(defaultSettings);

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

      const tempSettings: Settings = { ...defaultSettings };

      if ('languageId' in data) {
        tempSettings.languageId = data.languageId;
      }

      if (JSON.stringify(settings) !== JSON.stringify(tempSettings)) {
        setSettings(tempSettings);
      }
    });
  }, []);

  const saveSettings = (settings: Settings) => {
    storeData(settings)
      .then(() => setSettings(settings))
      .catch((err) => console.error('Failed to save settings: ', err));
  };

  return {
    settings: settings,
    saveSettings: saveSettings,
  };
};
