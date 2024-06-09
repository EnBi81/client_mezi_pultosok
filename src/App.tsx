import React from 'react';
import './notifications/PushNotificationsConfig';
import { AppNavigation } from './navigation/AppNavigation';
import { SettingsContextProvider } from './context/settings/SettingsContextProvider';
import { PultosokDataContextProvider } from './context/schedule_data/PultosokDataContextProvider';
import { LocaleContextProvider } from './context/locale/LocaleContextProvider';
import { AppBackground } from './components/AppBackground';
import { DeviceLocationManager } from './global_managers/location/DeviceLocationManager';
import { ThemeManager } from './global_managers/theme/ThemeManager';
import { SunPositionContextProvider } from './context/sun_position/SunPositionContextProvider';

export default function App() {
  return (
    <SettingsContextProvider>
      <LocaleContextProvider>
        <PultosokDataContextProvider>
          <AppBackground>
            <DeviceLocationManager>
              <SunPositionContextProvider>
                <ThemeManager>
                  <AppNavigation />
                </ThemeManager>
              </SunPositionContextProvider>
            </DeviceLocationManager>
          </AppBackground>
        </PultosokDataContextProvider>
      </LocaleContextProvider>
    </SettingsContextProvider>
  );
}
