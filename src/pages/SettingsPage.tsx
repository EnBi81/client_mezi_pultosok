import { View, Text, StyleSheet } from 'react-native';
import { SettingsSection } from '../components/settings/general/SettingsSection';
import { LanguageRadioButtons } from '../components/settings/LanguageRadioButtons';

export const SettingsPage = () => {
  // inspiration: https://i.pinimg.com/736x/b8/c9/c5/b8c9c5b7e004b69af78ce9773cf965ff.jpg

  return (
    <View style={styles.contentWrapper}>
      <View style={{ height: 30 }}></View>
      <SettingsSection
        title={'General'}
        description={'General behaviour and appearance'}
      />

      <View>
        <View
          style={{
            borderRadius: 12,
            backgroundColor: '#f6f6f6',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <View>
            <LanguageRadioButtons />
          </View>
        </View>
      </View>

      <View style={{ height: 40 }}></View>
      <SettingsSection
        title={'Notifications'}
        description={'Customize your notifications'}
      />

      <View>
        <View
          style={{
            borderRadius: 12,
            backgroundColor: '#f6f6f6',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <View></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    paddingHorizontal: 8,
  },
  maxSize: {
    width: '100%',
    height: '100%',
  },
  whiteBg: {
    backgroundColor: 'white',
  },
});
