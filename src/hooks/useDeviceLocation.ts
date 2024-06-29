import { useContext } from 'react';
import { DeviceLocationContext } from '../context/location/DeviceLocationContext';

export const useDeviceLocation = () => {
  const { location, deviceCountry, updateLocation } = useContext(DeviceLocationContext);

  return {
    location,
    deviceCountry,
    updateLocation,
  };
};
