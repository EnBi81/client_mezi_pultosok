import { useDeviceLocationContextHook } from './useDeviceLocationContextHook';
import { DeviceLocationContext } from './DeviceLocationContext';

export const DeviceLocationProvider = ({ children }: { children: React.ReactNode }) => {
  const { location, updateLocation } = useDeviceLocationContextHook();

  return (
    <DeviceLocationContext.Provider
      value={{
        location,
        updateLocation,
      }}
    >
      {children}
    </DeviceLocationContext.Provider>
  );
};
