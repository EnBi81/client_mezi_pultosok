import { endpoints } from '../../api/endpoints';
import { CURRENT_APK_VERSION } from '../../utils/constants';
import { NotificationService } from '../../notifications/NotificationService';
import { storages } from '../../storage/Storages';
import { getCurrentLocalTranslations } from '../../context/locale/locales';

export const ApkUpdateChecker = async () => {
  const storage = storages.lastSavedLatestApkVersion();

  // fetch latest apk version
  const latestApkVersion = await endpoints.latestApkVersion();

  // check installed
  // if not the same:
  if (CURRENT_APK_VERSION === latestApkVersion) return;

  // if notification for the latest apk was show then ignore
  const lastSavedLatestApkVersion = await storage.get();
  if (lastSavedLatestApkVersion?.version === latestApkVersion) return;

  const settingsStorage = storages.settings();
  const settings = await settingsStorage.get();

  if (!settings?.notifications.appUpdates) {
    return;
  }

  // get locales
  const locale = getCurrentLocalTranslations(settings);

  // else show notification
  const notificationService = NotificationService();
  notificationService.notifications.sendApkUpdateNotification({ locale: locale, version: latestApkVersion });

  // save that notification for that was shown
  await storage.store({
    version: latestApkVersion,
  });
};
