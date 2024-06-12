import { LocalStorage } from './LocalStorage';
import { Settings } from '../interfaces/Settings';

export const storages = {
  lastSavedLatestApkVersion: () => LocalStorage<LastSavedLatestApkVersion>({ key: 'latest-apk-cache-key' }),
  settings: () => LocalStorage<Settings>({ key: 'settings-cache-key' }),
};

interface LastSavedLatestApkVersion {
  version: string;
}
