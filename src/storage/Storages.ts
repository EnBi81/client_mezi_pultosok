import { LocalStorage } from './LocalStorage';
import { Settings } from '../interfaces/Settings';
import { WorkingDaySchedule } from '../interfaces/WorkingDaySchedule';

export const storages = {
  lastSavedLatestApkVersion: () => LocalStorage<LastSavedLatestApkVersion>({ key: 'latest-apk-cache-key' }),
  settings: () => LocalStorage<Settings>({ key: 'settings-cache-key' }),
  schedule: () => LocalStorage<{ cacheTime: number; data: WorkingDaySchedule[] }>({ key: 'schedule-data-cache-key' }),
};

interface LastSavedLatestApkVersion {
  version: string;
}
