import PushNotification, { Importance } from 'react-native-push-notification';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { LanguageTranslation } from '../interfaces/LanguageTranslation';
import { formatString } from '../utils/utils';

export const NotificationService = () => {
  const hasNotificationPermission = async (): Promise<boolean> => {
    const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    return result === RESULTS.GRANTED;
  };

  const requestNotificationPermission = async (): Promise<boolean> => {
    try {
      const requestResult = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      return requestResult === RESULTS.GRANTED;
    } catch (e) {
      console.error('Permission request error: ', e);
      return false;
    }
  };

  /*requestNotificationPermission()
    .then(() => console.log('notification request success'))
    .catch((err) => console.log('notification request error: ', err));*/

  function init() {
    // accidentally left this channel in it in previous builds, want to ensure the default
    // channel is deleted
    PushNotification.deleteChannel('default');
    PushNotification.createChannel(
      {
        channelId: 'apk_update_available', // (required)
        channelName: 'Update Available', // (required)
        channelDescription: 'Notify on available APK updates', // (optional) default: undefined.
        importance: Importance.IMPORTANCE_DEFAULT, // (optional) default: 4. Int value of the Android notification importance
        vibrate: false, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel 'apk_update_available' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  const sendApkUpdateNotification = ({ locale, version }: { version: string; locale: LanguageTranslation }) => {
    PushNotification.localNotification({
      ticker: '',
      userInfo: undefined,
      channelId: 'apk_update_available',
      title: locale.notifications.update.updateAvailableTitle,
      message: formatString(locale.notifications.update.updateAvailableDescription, version),
      playSound: false,
      showWhen: false,
      ignoreInForeground: true,
      //actions: [locale.notifications.update.updateButton, locale.notifications.update.dismissButton],
    });
  };

  return {
    notifications: {
      sendApkUpdateNotification,
    },
    init: init,
    permissions: {
      check: hasNotificationPermission,
      request: requestNotificationPermission,
    },
  };
};
