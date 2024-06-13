import { Icon } from '../Icon';
import { SettingsOptionContainer } from './SettingsOptionContainer';
import { useSettings } from '../../hooks/useSettings';
import { StyleSheet, Switch, View } from 'react-native';
import { toast } from '../../utils/utils';
import { useLocale } from '../../hooks/useLocale';
import { NotificationService } from '../../notifications/NotificationService';

export const SettingsNotificationsSection = () => {
  const { settings, modifySettings } = useSettings();
  const { l } = useLocale();
  const notificationService = NotificationService();

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

  return (
    <View>
      <SettingsOptionContainer
        icon={<Icon name={settings.notifications.masterSwitch ? 'notifications-active' : 'notifications-none'} />}
        title={l.settings.notifications.notificationsButton}
        onPress={() => toggleNotificationsMaster()}
        rightSide={
          <Switch onValueChange={() => toggleNotificationsMaster()} value={settings.notifications.masterSwitch} />
        }
      />
      <View
        style={[
          styles.subSection,
          {
            opacity: settings.notifications.masterSwitch ? 1 : 0.7,
          },
        ]}
      >
        <SettingsOptionContainer
          icon={<Icon name={settings.notifications.appUpdates ? 'notifications-active' : 'notifications-none'} />}
          title={l.settings.notifications.notificationsAppUpdatesButton}
          onPress={toggleNotificationsAppUpdates}
          rightSide={<Switch onValueChange={toggleNotificationsAppUpdates} value={settings.notifications.appUpdates} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subSection: {
    paddingLeft: 15,
  },
});