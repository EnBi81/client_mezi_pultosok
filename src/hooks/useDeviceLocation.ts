import { useSettings } from './useSettings';

export const useDeviceLocation = () => {
  const { settings } = useSettings();

  return {
    location: {
      latitude: settings.locationCache.latitude,
      longitude: settings.locationCache.longitude,
      access: settings.locationCache.locationAccess,
    },
  };
};
