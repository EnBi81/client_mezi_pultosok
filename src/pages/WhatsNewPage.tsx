import { View, Text, ScrollView } from 'react-native';

export const WhatsNewPage = () => {
  return (
    <View>
      <ScrollView style={{ padding: 10 }}>
        <VersionSection version={'V1.5.6'}>
          <BulletPoint text={'Working Day card now displays workers taken off the schedule'} />
          <BulletPoint text={'Displaying error card upon network failure instead of spamming toast'} />
          <BulletPoint text={'Display device country name next to the Update Location button'} />
        </VersionSection>
        <VersionSection version={'V1.5.5'}>
          <BulletPoint text={'Fixed issue with plus signs appearing for old changes'} />
          <BulletPoint text={'Removed location access issue toast messages when location is requested on startup'} />
          <BulletPoint text={'Note: Location is only requested in sun sync mode'} />
        </VersionSection>
        <VersionSection version={'V1.5.4'}>
          <BulletPoint text={'Fixed some typos'} />
          <BulletPoint text={'Reworked the logic of the NEW tag'} />
        </VersionSection>
        <VersionSection version={'V1.5.3'}>
          <BulletPoint text={'Fixed list widget refreshing'} />
          <BulletPoint text={'List widget refresh and open app button'} />
          <BulletPoint text={'Update Location button'} />
          <BulletPoint text={'Updated gradient picker algorithm'} />
          <BulletPoint text={'Technical: Gradient Debug Manager'} />
        </VersionSection>
        <VersionSection version={'V1.5.2'}>
          <BulletPoint text={'Green plus sign next to the names which were recently added'} />
        </VersionSection>
        <VersionSection version={'V1.5.1'}>
          <BulletPoint text={'Added new, scrollable widget to view the list of the schedules'} />
          <BulletPoint text={'Fixed the current day widget'} />
          <BulletPoint text={'Master notification switch now turns off schedule update notifications'} />
          <BulletPoint text={'Added quality preview images for the widgets'} />
        </VersionSection>
        <VersionSection version={'V1.5.0'}>
          <BulletPoint text={'Added Working Schedule Notifications'} />
          <BulletPoint text={'Auto refresh schedule when app is opened'} />
        </VersionSection>
        <VersionSection version={'V1.4.7'}>
          <BulletPoint text={'Adding Debug mode'} />
          <BulletPoint text={'Fixing icons for notifications'} />
        </VersionSection>
        <VersionSection version={'V1.4.6'}>
          <BulletPoint text={'Added Localization for the update app prompt popup'} />
        </VersionSection>
        <VersionSection version={'V1.4.5'}>
          <BulletPoint text={'Removed scrolling down condition when showing the Scroll to top button'} />
        </VersionSection>
        <VersionSection version={'V1.4.4'}>
          <BulletPoint text={'Prompting download upon clicking on app update notification'} />
          <BulletPoint text={'Fixed notification permissions'} />
        </VersionSection>
        <VersionSection version={'V1.4.3'}>
          <BulletPoint text={'Added Scroll to Top button to the schedule page'} />
          <BulletPoint text={'Fixed color issue in ripple effect'} />
        </VersionSection>
        <VersionSection version={'V1.4.2'}>
          <BulletPoint text={'Added whats new page'} />
          <BulletPoint text={'Added current gradient to the settings page'} />
          <BulletPoint text={'Fixing notification permission request'} />
        </VersionSection>
        <VersionSection version={'V1.4.1'}>
          <BulletPoint text={'Fixing notifications for app updates'} />
        </VersionSection>
        <VersionSection version={'V1.4.0'}>
          <BulletPoint text={'Added Notification settings to the settings page'} />
          <BulletPoint text={'Added background fetching and notifications for available app updates'} />
        </VersionSection>
        <VersionSection version={'V1.3.8'}>
          <BulletPoint text={'Fixing Sun-Sync mode timeout by listening to app state changes'} />
          <BulletPoint text={'Technical: restructuring and refactoring'} />
          <BulletPoint text={'Added update button to settings'} />
          <BulletPoint text={'Adding app info to the bottom of the settings'} />
          <BulletPoint text={'Enabled scrolling on the settings page'} />
        </VersionSection>
        <VersionSection version={'V1.3.7'}>
          <BulletPoint text={'Added a special gradient for 20th of August'} />
        </VersionSection>
        <VersionSection version={'V1.3.6'}>
          <BulletPoint text={'Golden hour fix 2: fixed some logic'} />
        </VersionSection>
        <VersionSection version={'V1.3.5'}>
          <BulletPoint text={'Golden hour fix 1: golden color scheme appeared outside of Sun-Synced mode'} />
        </VersionSection>
        <VersionSection version={'V1.3.4'}>
          <BulletPoint text={'Added Golden hour to Sun-Sync mode'} />
          <BulletPoint text={'Golden hour times: after sunrise and before sunset'} />
        </VersionSection>
        <VersionSection version={'V1.3.3'}>
          <BulletPoint text={'Fixed white flashing when opening settings in dark mode'} />
          <BulletPoint text={'Fixed separator line color in settings'} />
          <BulletPoint text={'Added Sun-Sync mode'} />
        </VersionSection>
        <VersionSection version={'V1.3.2'}>
          <BulletPoint text={'Fixed colors for dark/light themes'} />
        </VersionSection>
        <VersionSection version={'V1.3.1'}>
          <BulletPoint text={'Fixed localization for Color theme radio buttons in settings'} />
        </VersionSection>
        <VersionSection version={'V1.3.0'}>
          <BulletPoint text={'Light/Dark mode'} />
          <BulletPoint text={'Added dark theme gradient colors'} />
          <BulletPoint text={'Added themes to settings page'} />
          <BulletPoint text={'Fixed issues with locale'} />
          <BulletPoint text={'Nw color palette picker algorithm'} />
        </VersionSection>
        <VersionSection version={'V1.2.9'}>
          <BulletPoint text={'Fixed color palette rotation'} />
        </VersionSection>
        <VersionSection version={'V1.2.8'}>
          <BulletPoint text={'Added functionality to Mark All Read button'} />
        </VersionSection>
        <VersionSection version={'V1.2.7'}>
          <BulletPoint text={'Added Mark All Read button (without functionality)'} />
        </VersionSection>
        <VersionSection version={'V1.2.6'}>
          <BulletPoint text={'Removed old update button (top of the screen)'} />
          <BulletPoint text={'Added new update button (from the settings icon)'} />
        </VersionSection>
        <VersionSection version={'V1.2.0'}>
          <BulletPoint text={'Added Navigation'} />
          <BulletPoint text={'Added Settings Page'} />
          <BulletPoint text={'Added Language/Localization radio buttons to settings page'} />
        </VersionSection>
        <VersionSection version={'V1.1.2'}>
          <BulletPoint text={'Technical: Added Workflow for CI/CD'} />
        </VersionSection>
        <VersionSection version={'V1.1.0'}>
          <BulletPoint text={'Added localization: English + Hungarian'} />
        </VersionSection>
        <VersionSection version={'V1.0.6'}>
          <BulletPoint text={'Modified the styling of the week divider card'} />
        </VersionSection>
        <VersionSection version={'V1.0.5'}>
          <BulletPoint text={'Technical: Added Prettier'} />
          <BulletPoint text={'Using android built in toast library'} />
          <BulletPoint text={'Added error card'} />
          <BulletPoint text={'Added loading skeletons'} />
          <BulletPoint text={'Added schedule week divider card'} />
        </VersionSection>
        <VersionSection version={'V1.0.4'}>
          <BulletPoint text={'Added Week Divider'} />
        </VersionSection>
        <VersionSection version={'V1.0.3'}>
          <BulletPoint text={'Fixed Widget border issue'} />
        </VersionSection>
        <VersionSection version={'<= V1.0.2'}>
          <BulletPoint text={'Created React Native app'} />
          <BulletPoint text={'Initial Schedule View'} />
          <BulletPoint text={'Pull to Refresh'} />
          <BulletPoint text={'Added simple widget'} />
          <BulletPoint text={'Install update button (at the top)'} />
        </VersionSection>
      </ScrollView>
    </View>
  );
};

export const VersionSection = ({ version, children }: { version: string; children: React.ReactNode }) => {
  return (
    <View style={{ marginBottom: 28 }}>
      <View>
        <Text style={{ fontSize: 24 }}>{version}</Text>
      </View>
      <View>{children}</View>
    </View>
  );
};

export const BulletPoint = ({ text }: { text: string }) => {
  return (
    <Text>
      {`\u2022`} {text}
    </Text>
  );
};
