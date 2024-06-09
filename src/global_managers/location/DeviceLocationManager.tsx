import { useDeviceLocationGlobalHook } from './useDeviceLocationGlobalHook';

export const DeviceLocationManager = ({ children }: { children: React.ReactNode }) => {
  const {} = useDeviceLocationGlobalHook();

  return children;
};
