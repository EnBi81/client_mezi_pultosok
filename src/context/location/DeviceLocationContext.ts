import { createContext } from 'react';
import { PermissionType } from '../../interfaces/Settings';

interface DeviceLocationContextInterface {
  location: {
    longitude: number | undefined;
    latitude: number | undefined;
    access: PermissionType;
  };
  deviceCountry: {
    code: string;
    name: string;
  };
  updateLocation: () => void;
}

export const DeviceLocationContextDefaultValue: DeviceLocationContextInterface = {
  updateLocation: () => {},
  location: {
    latitude: undefined,
    longitude: undefined,
    access: undefined,
  },
  deviceCountry: {
    code: '-',
    name: '-',
  },
};

export const DeviceLocationContext = createContext(DeviceLocationContextDefaultValue);
