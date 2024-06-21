import { useSettings } from './useSettings';
import { useContext } from 'react';
import { DeviceLocationContext } from '../context/location/DeviceLocationContext';

export const useDeviceLocation = () => {
  const { settings } = useSettings();
  const { updateLocation } = useContext(DeviceLocationContext);

  return {
    location: {
      latitude: settings.locationCache.latitude,
      longitude: settings.locationCache.longitude,
      access: settings.locationCache.locationAccess,
    },
    updateLocation,
  };
};
