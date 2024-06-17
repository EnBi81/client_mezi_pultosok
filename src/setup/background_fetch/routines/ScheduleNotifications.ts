import { endpoints } from '../../../api/endpoints';
import { ScheduleComparison } from '../../../utils/ScheduleComparison';
import { storages } from '../../../storage/Storages';
import { getCurrentLocalTranslations, getDevicePrimaryLanguage } from '../../../context/locale/locales';

export const ScheduleNotifications = async () => {
  const settingsStorage = storages.settings();

  const settings = await settingsStorage.get();
  if (!settings?.notifications.scheduleUpdates) {
    return;
  }

  const scheduleCacheStorage = storages.schedule();
  const locale = getCurrentLocalTranslations(settings);

  const [cachedData, networkingData] = await Promise.all([
    scheduleCacheStorage.get(),
    endpoints.scheduleData({ locale, localeCode: getDevicePrimaryLanguage().locale }),
  ]);

  // if no data is available, skip
  if (cachedData === undefined || networkingData?.data === undefined) {
    return;
  }

  const comparisonResult = ScheduleComparison.compare(cachedData?.data ?? [], networkingData.data);
  ScheduleComparison.showNotifications(comparisonResult.changes).catch((e) =>
    console.log('error while invoking notifications: ', e),
  );

  if (networkingData?.data) {
    await scheduleCacheStorage.store({ data: comparisonResult.processedSchedule, cacheTime: new Date().getTime() });
  }
};
