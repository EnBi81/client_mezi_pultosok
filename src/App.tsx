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
import { ApkUpdateContextProvider } from './context/update/ApkUpdateContextProvider';
import { PaperProvider } from 'react-native-paper';
import './background_fetch/BackgroundFetch';

export default function App() {
  const providers = [
    PaperProvider,
    SettingsContextProvider,
    LocaleContextProvider,
    PultosokDataContextProvider,
    ApkUpdateContextProvider,
    DeviceLocationManager,
    SunPositionContextProvider,
    ThemeManager,
    AppBackground,
  ];

  return providers.reverse().reduce((children, Provider) => <Provider>{children}</Provider>, <AppNavigation />);
}
