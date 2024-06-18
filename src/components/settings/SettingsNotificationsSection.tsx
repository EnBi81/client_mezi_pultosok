import { Icon } from '../Icon';
import { SettingsOptionContainer } from './SettingsOptionContainer';
import { useSettings } from '../../hooks/useSettings';
import { Switch, View } from 'react-native';
import { toast } from '../../utils/utils';
import { useLocale } from '../../hooks/useLocale';
import { useNotificationService } from '../../hooks/useNotificationService';
import { useEnvironment } from '../../hooks/useEnvironment';

export const SettingsNotificationsSection = () => {
  const { settings, modifySettings } = useSettings();
  const { l } = useLocale();
  const notificationService = useNotificationService();
  const { isDebug } = useEnvironment();

  const toggleNotificationsMaster = async () => {
    const hasAccess = await notificationService.permissions.check();
    if (!hasAccess) {
      const gotAccess = await notificationService.permissions.request();
      if (!gotAccess) {
        toast(l.settings.notifications.permissionDenied);
        return;
      }
    }

    modifySettings((settings) => {
      settings.notifications.masterSwitch = !settings.notifications.masterSwitch;

      if (!settings.notifications.masterSwitch) {
        settings.notifications.appUpdates = false;
        settings.notifications.scheduleUpdates = false;
      }
    });
  };

  const toggleNotificationsAppUpdates = () => {
    if (!settings.notifications.masterSwitch) {
      toast(l.settings.notifications.masterNotificationOff);
      return;
    }

    modifySettings((settings) => (settings.notifications.appUpdates = !settings.notifications.appUpdates));
  };

  const toggleNotificationsScheduleUpdates = () => {
    if (!settings.notifications.masterSwitch) {
      toast(l.settings.notifications.masterNotificationOff);
      return;
    }

    modifySettings((settings) => (settings.notifications.scheduleUpdates = !settings.notifications.scheduleUpdates));
  };

  return (
    <View>
      <SettingsOptionContainer
        icon={<Icon name={settings.notifications.masterSwitch ? 'notifications-on' : 'notifications-off'} />}
        title={l.settings.notifications.notificationsButton}
        onPress={() => toggleNotificationsMaster()}
        rightSide={
          <Switch onValueChange={() => toggleNotificationsMaster()} value={settings.notifications.masterSwitch} />
        }
      />
      <View
        style={{
          opacity: settings.notifications.masterSwitch ? 1 : 0.7,
        }}
      >
        <SettingsOptionContainer
          icon={<Icon name={settings.notifications.appUpdates ? 'notifications-on' : 'notifications-off'} />}
          title={l.settings.notifications.notificationsAppUpdatesButton}
          level={1}
          onPress={toggleNotificationsAppUpdates}
          rightSide={<Switch onValueChange={toggleNotificationsAppUpdates} value={settings.notifications.appUpdates} />}
        />
        {isDebug && (
          <SettingsOptionContainer
            icon={<Icon name={'notification-add'} />}
            title={'Test Update Notification'}
            level={2}
            onPress={() =>
              notificationService.notifications.sendApkUpdateNotification({
                version: '1.4.3-test',
                locale: l,
                ignoreInForegroundOverride: false,
              })
            }
          />
        )}
        <SettingsOptionContainer
          icon={<Icon name={settings.notifications.scheduleUpdates ? 'notifications-on' : 'notifications-off'} />}
          title={l.settings.notifications.notificationScheduleUpdateButton}
          level={1}
          onPress={toggleNotificationsScheduleUpdates}
          rightSide={
            <Switch onValueChange={toggleNotificationsScheduleUpdates} value={settings.notifications.scheduleUpdates} />
          }
        />
        {isDebug && (
          <SettingsOptionContainer
            icon={<Icon name={'notification-add'} />}
            title={'Test Worker Changed Notification'}
            level={2}
            onPress={() =>
              notificationService.notifications.checkWorkersChangedSummaryExists({
                isTest: true,
                callback: (exists) => {
                  notificationService.notifications.sendWorkersChangedNotification({
                    title: '2024.06.25 (Cikola)',
                    message: 'Katu assigned to work',
                    locale: l,
                    isTest: true,
                    groupSummary: !exists,
                  });
                },
              })
            }
          />
        )}
      </View>
    </View>
  );
};
