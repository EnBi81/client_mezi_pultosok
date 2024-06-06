import React from 'react';
import './notifications/PushNotificationsConfig';
import { AppNavigation } from './navigation/AppNavigation';
import { SettingsContextProvider } from './settings/context_hooks/SettingsContextProvider';
import { PultosokDataContextProvider } from './schedule_data/context_hooks/PultosokDataContext';
import { LocaleContextProvider } from './locale/context_hooks/LocaleContextProvider';

export default function App() {
  return (
    <SettingsContextProvider>
      <LocaleContextProvider>
        <PultosokDataContextProvider>
          <AppNavigation />
        </PultosokDataContextProvider>
      </LocaleContextProvider>
    </SettingsContextProvider>
  );
}
