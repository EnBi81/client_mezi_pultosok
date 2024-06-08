import React from 'react';
import './notifications/PushNotificationsConfig';
import { AppNavigation } from './navigation/AppNavigation';
import { SettingsContextProvider } from './settings/context_hooks/SettingsContextProvider';
import { PultosokDataContextProvider } from './schedule_data/context_hooks/PultosokDataContext';
import { LocaleContextProvider } from './locale/context_hooks/LocaleContextProvider';
import { AppBackground } from './components/AppBackground';
import { DeviceLocationManager } from './location/context_hooks/DeviceLocationManager';
import { ThemeManager } from './colors_themes/ThemeManager';

export default function App() {
  return (
    <SettingsContextProvider>
      <LocaleContextProvider>
        <PultosokDataContextProvider>
          <AppBackground>
            <DeviceLocationManager>
              <ThemeManager>
                <AppNavigation />
              </ThemeManager>
            </DeviceLocationManager>
          </AppBackground>
        </PultosokDataContextProvider>
      </LocaleContextProvider>
    </SettingsContextProvider>
  );
}
