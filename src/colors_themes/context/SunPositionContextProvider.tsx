import { SunPositionContext } from './SunPositionContext';
import { useSunPositionContextHook } from './useSunPositionContextHook';
import React from 'react';

export const SunPositionContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { nextEvent } = useSunPositionContextHook();
  return <SunPositionContext.Provider value={{ next: nextEvent }}>{children}</SunPositionContext.Provider>;
};
