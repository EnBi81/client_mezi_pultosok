import React from 'react';
import './notifications/PushNotificationsConfig';
import { AppNavigation } from './navigation/AppNavigation';
import { SettingsContextProvider } from './settings/SettingsContext';
import { PultosokDataContextProvider } from './schedule_data/PultosokDataContext';

export default function App() {
  return (
    <SettingsContextProvider>
      <PultosokDataContextProvider>
        <AppNavigation />
      </PultosokDataContextProvider>
    </SettingsContextProvider>
  );
}
