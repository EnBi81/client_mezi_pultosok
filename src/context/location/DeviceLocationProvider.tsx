import { useDeviceLocationContextHook } from './useDeviceLocationContextHook';
import { DeviceLocationContext } from './DeviceLocationContext';

export const DeviceLocationProvider = ({ children }: { children: React.ReactNode }) => {
  const { location, deviceCountry, updateLocation } = useDeviceLocationContextHook();

  return (
    <DeviceLocationContext.Provider
      value={{
        location,
        deviceCountry,
        updateLocation,
      }}
    >
      {children}
    </DeviceLocationContext.Provider>
  );
};
