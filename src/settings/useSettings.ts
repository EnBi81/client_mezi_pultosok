import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings } from '../interfaces/Settings';
import { useContext, useEffect } from 'react';
import { DefaultSettings } from './SettingsContext';
import { SettingsContext } from './SettingsContext';

export const useSettings = () => {
  const settingsKey = 'settings-key';

  const { settings, modifySettings } = useContext(SettingsContext);

  console.log('Current settings: ' + settings.languageId);

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

      console.log('load settings to  ' + tempSettings.languageId);

      if (JSON.stringify(settings) !== JSON.stringify(tempSettings)) {
        modifySettings(tempSettings);
      }
    });
  }, []);

  const modifySettingsCache = (settings: Settings) => {
    const newSettings = { ...settings };

    storeData(newSettings)
      .then(() => {
        console.log('set settings to ' + newSettings.languageId);
        modifySettings(newSettings);
      })
      .catch((err) => console.error('Failed to save settings: ', err));
  };

  return {
    settings: settings,
    modifySettings: modifySettingsCache,
  };
};
