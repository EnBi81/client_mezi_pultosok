export interface LanguageTranslation {
  navigation: {
    schedulePage: {
      name: string;
    };
    settingsPage: {
      name: string;
    };
  };
  schedule: {
    errorOccurred: string;
    new: string;
    weekNumber: string;
    thisShouldNotBeSeen: string;
    daysOfWeek: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
    };
    networking: { dataLoaded: string; dataError: string; networkError: string };
  };
  update: { updateTo: string; downloading: string; installing: string };
  settings: {
    general: {
      title: string;
      description: string;
      language: { collapseTitle: string; systemDefault: string };
      colorTheme: {
        collapseTitle: string;
        systemDefault: string;
        lightMode: string;
        darkMode: string;
        sunSync: string;
        sunSyncModeTurnedOffBecauseLocationDenied: string;
        sunSyncModeEnableLocationToTurnOnSunSyncMode: string;
        sunriseInHours: string;
        sunriseInHour: string;
        sunriseInMinutes: string;
        sunriseInMinute: string;
        sunsetInHours: string;
        sunsetInHour: string;
        sunsetInMinutes: string;
        sunsetInMinute: string;
      };
      markAllAsRead: string;
      markedAllAsRead: string;
    };
    markAllAsRead: string;
  };
  location: {
    permissionDenied: string;
    providerNotAvailable: string;
    requestTimedOut: string;
    googlePlayNotAvailable: string;
    serviceNotAvailable: string;
    error: string;
  };
}
