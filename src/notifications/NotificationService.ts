import { useEffect } from 'react';
import PushNotification, { Importance } from 'react-native-push-notification';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const NotificationService = () => {
  const requestNotificationPermission = async () => {
    const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    console.log('notification perm: ', result);
    if (result !== RESULTS.GRANTED) {
      const requestResult = await request(
        PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
      );
      console.log('notification request result: ', requestResult);
    }
  };

  requestNotificationPermission()
    .then(() => console.log('notification request success'))
    .catch((err) => console.log('notification request error: ', err));

  PushNotification.createChannel(
    {
      channelId: 'default', // (required)
      channelName: 'Default channel', // (required)
      channelDescription: 'A default channel', // (optional) default: undefined.
      importance: Importance.HIGH, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel 'default' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );

  setTimeout(() => {
    return;
    console.log('show notification');
    PushNotification.localNotification({
      ticker: '',
      userInfo: undefined,
      channelId: 'default',
      title: 'My Notification Title',
      message: 'My Notification Message',
    });
  }, 2000);

  PushNotification.getChannels(function (channels) {
    console.log(channels);
  });

  return {};
};
