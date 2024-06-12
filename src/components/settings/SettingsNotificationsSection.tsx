import { Icon } from '../Icon';
import { SettingsOptionContainer } from './SettingsOptionContainer';
import { useSettings } from '../../hooks/useSettings';
import { StyleSheet, Switch, View } from 'react-native';
import { toast } from '../../utils/utils';
import { useLocale } from '../../hooks/useLocale';

export const SettingsNotificationsSection = () => {
  const { settings, modifySettings } = useSettings();
  const { l } = useLocale();

  const toggleNotificationsMaster = () => {
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
        onPress={toggleNotificationsMaster}
        rightSide={<Switch onValueChange={toggleNotificationsMaster} value={settings.notifications.masterSwitch} />}
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
