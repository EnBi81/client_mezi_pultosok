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
    locationAccess: PermissionType;
  };
  notifications: {
    masterSwitch: boolean;
    appUpdates: boolean;
    scheduleUpdates: boolean;
  };
}

export type PermissionType = 'granted' | 'denied' | undefined;
