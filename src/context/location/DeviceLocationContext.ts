import { createContext } from 'react';

interface DeviceLocationContextInterface {
  location: {
    longitude: number | undefined;
    latitude: number | undefined;
  };
  updateLocation: () => void;
}

export const DeviceLocationContextDefaultValue: DeviceLocationContextInterface = {
  updateLocation: () => {},
  location: {
    latitude: undefined,
    longitude: undefined,
  },
};

export const DeviceLocationContext = createContext(DeviceLocationContextDefaultValue);
