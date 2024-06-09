import { useContext } from 'react';
import { SunPositionContext } from '../context/sun_position/SunPositionContext';

export const useSunPosition = () => {
  const { next } = useContext(SunPositionContext);
  return { nextSunEvent: next };
};
