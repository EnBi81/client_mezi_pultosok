import { Icon } from '../Icon';
import { SettingsOptionContainer } from './SettingsOptionContainer';
import { useSettings } from '../../hooks/useSettings';
import { StyleSheet, Switch, View } from 'react-native';
import { toast } from '../../utils/utils';

export const SettingsNotificationsSection = () => {
  const { settings, modifySettings } = useSettings();

  const toggleNotificationsMaster = () => {
    modifySettings((settings) => (settings.notifications.masterSwitch = !settings.notifications.masterSwitch));
  };

  const toggleNotificationsAppUpdates = () => {
    if (!settings.notifications.masterSwitch) {
      toast('Notifications are off');
      return;
    }

    modifySettings((settings) => (settings.notifications.appUpdates = !settings.notifications.appUpdates));
  };

  return (
    <View>
      <SettingsOptionContainer
        icon={<Icon name={settings.notifications.masterSwitch ? 'notifications-active' : 'notifications-none'} />}
        title={'Notifications'}
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
          title={'App Updates'}
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
