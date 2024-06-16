import { useEffect, useState } from 'react';
import { CURRENT_APK_VERSION } from '../../utils/constants';
import DeviceInfo from 'react-native-device-info';
import { useColorTheme } from '../../hooks/useColorTheme';
import { View, Text, StyleSheet } from 'react-native';

export const SettingsAppInfoComponent = () => {
  const [staticTexts, setStaticTexts] = useState<string[]>();
  const { colors } = useColorTheme();

  useEffect(() => {
    setStaticTexts([
      `${DeviceInfo.getApplicationName()} V${CURRENT_APK_VERSION} (${DeviceInfo.getBuildNumber()})`,
      DeviceInfo.getBundleId(),
      `${DeviceInfo.getBrand()} - ${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}`,
      DeviceInfo.getDeviceId(),
    ]);
  }, []);

  return (
    <View style={styles.container}>
      {staticTexts?.map((text, i) => {
        return (
          <Text
            style={{
              color: colors.text.secondary,
            }}
            key={i}
          >
            {text}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
