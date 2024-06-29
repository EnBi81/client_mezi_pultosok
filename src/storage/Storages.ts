import { LocalStorage } from './LocalStorage';
import { Settings } from '../interfaces/Settings';
import { WorkingDaySchedule } from '../interfaces/WorkingDaySchedule';
import { STORAGE_KEYS } from '../utils/constants';

export const storages = {
  lastSavedLatestApkVersion: () =>
    LocalStorage<LastSavedLatestApkVersion>({
      key: STORAGE_KEYS === 'production' ? 'latest-apk-cache-key' : 'latest-apk-cache-key-debug',
    }),
  settings: () =>
    LocalStorage<Settings>({ key: STORAGE_KEYS === 'production' ? 'settings-cache-key' : 'settings-cache-key-debug' }),
  schedule: () =>
    LocalStorage<{ cacheTime: number; data: WorkingDaySchedule[] }>({
      key: STORAGE_KEYS === 'production' ? 'schedule-data-cache-key' : 'schedule-data-cache-key-debug',
    }),
};

interface LastSavedLatestApkVersion {
  version: string;
}
