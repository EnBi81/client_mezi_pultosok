import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { SettingsHeader } from '../components/settings/SettingsHeader';
import { LanguageRadioButtons } from '../components/settings/LanguageRadioButtons';
import { useLocale } from '../hooks/useLocale';
import { GradientBorder } from '../components/GradientBorder';
import { MarkAllReadButton } from '../components/settings/MarkAllReadButton';
import { ColorThemeRadioButtons } from '../components/settings/ColorThemeRadioButtons';
import { useColorTheme } from '../hooks/useColorTheme';
import { useApkUpdater } from '../hooks/useApkUpdater';
import { formatString } from '../utils/utils';
import { CURRENT_APK_VERSION } from '../utils/constants';
import { SettingsUpdateButton } from '../components/settings/SettingsUpdateButton';
import { SettingsNotificationsSection } from '../components/settings/SettingsNotificationsSection';
import { SettingsAppInfoComponent } from '../components/settings/SettingsAppInfoComponent';
import { SettingsCurrentGradientDisplay } from '../components/settings/SettingsCurrentGradientDisplay';

export const SettingsPage = () => {
  const { l } = useLocale();
  const { colors } = useColorTheme();
  const { isUpdateAvailable, latestApkVersion } = useApkUpdater();

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.contentWrapper, { backgroundColor: colors.background.page }]}>
          {isUpdateAvailable && (
            <View>
              <SettingsHeader
                title={l.settings.update.title}
                description={formatString(l.settings.update.description, latestApkVersion, CURRENT_APK_VERSION)}
              />
              <GradientBorder borderWidth={2} borderRadius={12}>
                <SettingsUpdateButton />
              </GradientBorder>
              <SettingsSectionDivider />
            </View>
          )}

          <SettingsHeader title={l.settings.general.title} description={l.settings.general.description} />
          <GradientBorder borderWidth={2} borderRadius={12}>
            <LanguageRadioButtons />
            <SettingsDivider />
            <ColorThemeRadioButtons />
            <SettingsDivider />
            <MarkAllReadButton />
          </GradientBorder>

          <SettingsSectionDivider />
          <SettingsHeader title={l.settings.notifications.title} description={l.settings.notifications.description} />
          <GradientBorder borderWidth={2} borderRadius={12}>
            <SettingsNotificationsSection />
          </GradientBorder>

          <SettingsSectionDivider />
          <SettingsDivider />
          <SettingsSectionDivider />

          <SettingsCurrentGradientDisplay />

          <SettingsSectionDivider />
          <View style={styles.versionContainer}>
            <SettingsAppInfoComponent />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const SettingsSectionDivider = () => <View style={{ height: 40 }}></View>;

const SettingsDivider = () => {
  const { colors } = useColorTheme();

  return (
    <View
      style={{
        width: '100%',
        height: 1,
        backgroundColor: colors.card.separatorLine,
      }}
    ></View>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    height: '100%',
    width: '100%',
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  contentWrapper: {
    width: '100%',
    paddingHorizontal: 8,
    paddingTop: 30,
    paddingBottom: 90,
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
  versionContainer: {
    width: '100%',
  },
});
