import React from 'react';
import './notifications/PushNotificationsConfig';
import { AppNavigation } from './navigation/AppNavigation';
import { SettingsContextProvider } from './settings/SettingsContext';

export default function App() {
  return (
    <SettingsContextProvider>
      <AppNavigation />
    </SettingsContextProvider>
  );
}
