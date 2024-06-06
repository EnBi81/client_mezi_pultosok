import React from 'react';
import './notifications/PushNotificationsConfig';
import { AppNavigation } from './navigation/AppNavigation';
import { SettingsContextProvider } from './settings/context_hooks/SettingsContext';
import { PultosokDataContextProvider } from './schedule_data/context_hooks/PultosokDataContext';

export default function App() {
  return (
    <SettingsContextProvider>
      <PultosokDataContextProvider>
        <AppNavigation />
      </PultosokDataContextProvider>
    </SettingsContextProvider>
  );
}
