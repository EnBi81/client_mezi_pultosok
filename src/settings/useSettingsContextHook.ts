import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { DefaultSettings } from './SettingsContext';
import { Settings } from '../interfaces/Settings';

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

  return {
    settings: settings,
    modifySettings: modifySettingsCache,
  };
};