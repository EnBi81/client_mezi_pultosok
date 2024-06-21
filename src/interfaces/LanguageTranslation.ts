export interface LanguageTranslation {
  navigation: {
    schedulePage: {
      name: string;
    };
    settingsPage: {
      name: string;
    };
    whatsNewPage: {
      name: string;
    };
    debugGradient: {
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
        updateLocation: string;
        locationRequested: string;
      };
      markAllAsRead: string;
      markedAllAsRead: string;
    };
    update: {
      title: string;
      description: string;
    };
    notifications: {
      title: string;
      description: string;
      masterNotificationOff: string;
      notificationsButton: string;
      notificationsAppUpdatesButton: string;
      permissionDenied: string;
      notificationScheduleUpdateButton: string;
    };
    currentGradient: string;
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
  notifications: {
    update: {
      updateAvailableTitle: string;
      updateAvailableDescription: string;
      updateAppPromptTitle: string;
      updateAppPromptDescription: string;
      updateAppPromptUpdateButton: string;
      updateAppPromptCancelButton: string;
      updateAppPromptCancelled: string;
    };
    schedule: {
      scheduleChanged: string;
      changeAddedSingle: string;
      changeAddedMulti: string;
      changeRemovedSingle: string;
      changeRemovedMulti: string;
      newDaysAddedTitle: string;
      newDaysAddedMessage: string;
      newDayAddedTitle: string;
      newDayAddedMessage: string;
    };
  };
}
