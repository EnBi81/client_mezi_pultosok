import PushNotification, { Importance } from 'react-native-push-notification';
import { checkNotifications, requestNotifications } from 'react-native-permissions';
import { LanguageTranslation } from '../interfaces/LanguageTranslation';
import { formatString } from '../utils/utils';

export const useNotificationService = () => {
  const channels = {
    // this was accidentally left in previous releases,
    // only purpose is to delete this channel
    default: 'default',
    // notifications for app updates, available newer versions
    updateAvailable: 'apk_update_available',
    // notifications when the workers have been changed
    // on an already planned working day
    workersChanged: 'workers_changed',
  };

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
        channelId: channels.updateAvailable, // (required)
        channelName: 'Update Available', // (required)
        channelDescription: 'Notify on available APK updates', // (optional) default: undefined.
        importance: Importance.DEFAULT, // (optional) default: 4. Int value of the Android notification importance
        vibrate: false, // (optional) default: true. Creates the default vibration pattern if true.
        playSound: false, // (optional) default: true
      },
      (created) => {
        if (created) {
          console.log(`Notification Channel '${channels.updateAvailable}' created`);
        }
      },
    );

    PushNotification.createChannel(
      {
        channelId: channels.workersChanged, // (required)
        channelName: 'Planned Schedule Change', // (required)
        channelDescription: 'Notify on schedule change on an already planned day', // (optional) default: undefined.
        importance: Importance.HIGH, // (optional) default: 4. Int value of the Android notification importance
      },
      (created) => {
        if (created) {
          console.log(`Notification Channel '${channels.workersChanged}' created`);
        }
      },
    );

    // accidentally left this channel in it in previous builds, want to ensure the default
    // channel is deleted
    PushNotification.deleteChannel(channels.default);
  }

  const sendApkUpdateNotification = ({
    locale,
    version,
    ignoreInForegroundOverride = true,
  }: {
    version: string;
    locale: LanguageTranslation;
    ignoreInForegroundOverride?: boolean;
  }) => {
    PushNotification.localNotification({
      ticker: '',
      userInfo: {},
      channelId: channels.updateAvailable,
      title: locale.notifications.update.updateAvailableTitle,
      message: formatString(locale.notifications.update.updateAvailableDescription, version),
      playSound: false,
      showWhen: false,
      ignoreInForeground: ignoreInForegroundOverride,
      largeIcon: '',
    });
  };

  const sendWorkersChangedNotification = ({
    title,
    message,
    locale,
    isTest = false,
    groupSummary,
  }: {
    title: string;
    message: string;
    locale: LanguageTranslation;
    groupSummary: boolean;
    isTest?: boolean;
  }) => {
    const group = isTest ? 'test-schedule-changed-group' : 'schedule-changed-group';
    const groupSummaryTag = isTest ? 'test-schedule-changed-group-summary' : 'schedule-changed-group-summary';

    PushNotification.localNotification({
      ticker: '',
      userInfo: {},
      channelId: channels.workersChanged,
      title: title,
      message: message,
      subText: isTest ? 'Test Schedule Changed' : locale.notifications.schedule.scheduleChanged,
      group: group,
      groupSummary: groupSummary,
      largeIcon: '',
      ignoreInForeground: false,
      tag: groupSummary ? groupSummaryTag : '',
    });
  };

  const checkWorkersChangedSummaryExists = ({ callback, isTest }: { isTest: boolean; callback: (boolean) => void }) => {
    const groupSummaryTag = isTest ? 'test-schedule-changed-group-summary' : 'schedule-changed-group-summary';

    PushNotification.getDeliveredNotifications((notifications) => {
      console.log(notifications);
      const summaryExists = notifications.some((n) => n.tag === groupSummaryTag);
      callback(summaryExists);
    });
  };

  return {
    notifications: {
      sendApkUpdateNotification,
      sendWorkersChangedNotification,
      checkWorkersChangedSummaryExists,
    },
    init: init,
    permissions: {
      check: hasNotificationPermission,
      request: requestNotificationPermission,
    },
  };
};
