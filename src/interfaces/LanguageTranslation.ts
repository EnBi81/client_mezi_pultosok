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
        eventHappeningNow: string;
        eventIn: string;
        failedToGetSunEvent: string;
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
  sunEvents: {
    sunrise: string;
    sunset: string;
    golderHourEvening: string;
    goldenHourEndMorning: string;
  };
  time: {
    hours: string;
    hour: string;
    minutes: string;
    minute: string;
    seconds: string;
    second: string;
  };
}
