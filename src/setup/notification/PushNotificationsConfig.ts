import PushNotification from 'react-native-push-notification';
import { Alert, Platform } from 'react-native';
import { ReactAppMessageQueue } from '../../utils/ReactAppMessageQueue';
import { toast } from '../../utils/utils';
import { getCurrentLocalTranslations } from '../../context/locale/locales';
import { storages } from '../../storage/Storages';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // Process the notification
    // Check if the notification has an action
    if (notification.channelId === 'apk_update_available') {
      storages
        .settings()
        .get()
        .then((settings) => {
          const translation = getCurrentLocalTranslations(settings);

          Alert.alert(
            translation.notifications.update.updateAppPromptTitle,
            translation.notifications.update.updateAppPromptDescription,
            [
              {
                text: translation.notifications.update.updateAppPromptCancelButton,
                onPress: () => toast(translation.notifications.update.updateAppPromptCancelled),
                style: 'cancel',
              },
              {
                text: translation.notifications.update.updateAppPromptUpdateButton,
                onPress: () => ReactAppMessageQueue.appUpdate.enqueue({}),
              },
            ],
          );
        });
    }

    // Required on iOS only
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: Platform.OS === 'ios',
});
