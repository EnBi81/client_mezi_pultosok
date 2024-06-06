import { View, StyleSheet } from 'react-native';
import { SettingsHeader } from '../components/settings/general/SettingsHeader';
import { LanguageRadioButtons } from '../components/settings/LanguageRadioButtons';
import { useLocale } from '../locale/hooks/useLocale';
import { GradientBorder } from '../components/settings/general/GradientBorder';
import { MarkAllReadButton } from '../components/settings/MarkAllReadButton';
import { ColorThemeRadioButtons } from '../components/settings/ColorThemeRadioButtons';

export const SettingsPage = () => {
  // inspiration: https://i.pinimg.com/736x/b8/c9/c5/b8c9c5b7e004b69af78ce9773cf965ff.jpg

  const { l } = useLocale();

  return (
    <View style={styles.contentWrapper}>
      <View style={{ height: 30 }}></View>
      <SettingsHeader
        title={l.settings.general.title}
        description={l.settings.general.description}
      />

      <GradientBorder borderWidth={2} borderRadius={12}>
        <LanguageRadioButtons />
        <SettingsDivider />
        <ColorThemeRadioButtons />
        <SettingsDivider />
        <MarkAllReadButton />
      </GradientBorder>

      <View style={{ height: 40 }}></View>

      {/*<SettingsHeader
        title={'Notifications'}
        description={'Customize your notifications'}
      />

      <GradientBorder borderWidth={2} borderRadius={12}>
        <Switch onValueChange={(val) => console.log('change')} value={true} />
      </GradientBorder>*/}
    </View>
  );
};

const SettingsDivider = () => {
  return (
    <View
      style={{ width: '100%', height: 1, backgroundColor: '#00000030' }}
    ></View>
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
  gradientContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientBorder: {
    padding: 2, // Adjust this value to control the thickness of the border
    borderRadius: 12,
  },
  gradientInnerContainer: {
    borderRadius: 10, // Adjust this value if needed
    backgroundColor: '#f6f6f6',
    width: '100%',
    overflow: 'hidden',
  },
});
