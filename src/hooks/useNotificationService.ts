import PushNotification, { Importance } from 'react-native-push-notification';
import { checkNotifications, requestNotifications } from 'react-native-permissions';
import { LanguageTranslation } from '../interfaces/LanguageTranslation';
import { formatString } from '../utils/utils';

export const UseNotificationService = () => {
  const hasNotificationPermission = async (): Promise<boolean> => {
    const result = await checkNotifications();
    return result.status === 'granted';
  };

  const requestNotificationPermission = async (): Promise<boolean> => {
    const result = await requestNotifications(['alert', 'sound']);
    return result.status === 'granted';
  };

  function init() {
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

    // accidentally left this channel in it in previous builds, want to ensure the default
    // channel is deleted
    PushNotification.deleteChannel('default');
  }

  const sendApkUpdateNotification = ({ locale, version }: { version: string; locale: LanguageTranslation }) => {
    PushNotification.localNotification({
      ticker: '',
      userInfo: {},
      channelId: 'apk_update_available',
      title: locale.notifications.update.updateAvailableTitle,
      message: formatString(locale.notifications.update.updateAvailableDescription, version),
      playSound: false,
      showWhen: false,
      ignoreInForeground: !__DEV__, // ignore it if not in dev
      //actions: [locale.notifications.update.updateButton],
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
