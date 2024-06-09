export interface Settings {
  languageId: string | undefined;
  colorThemeProps: {
    type: 'user-preference' | 'light' | 'dark' | 'custom-sunsync';
    darkTimeFrom: string | undefined;
    darkTimeTo: string | undefined;
  };
  locationCache: {
    latitude: number | undefined;
    longitude: number | undefined;
    locationAccess: 'granted' | 'denied' | undefined;
  };
  notifications: {
    masterSwitch: boolean;
    appUpdates: boolean;
  };
}
