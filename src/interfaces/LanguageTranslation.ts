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
      markAllAsRead: string;
      markedAllAsRead: string;
    };
    markAllAsRead: string;
  };
}
