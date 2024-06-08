import { useContext } from 'react';
import { SunPositionContext } from '../context/SunPositionContext';

export const useSunPosition = () => {
  const { next } = useContext(SunPositionContext);
  return { nextSunEvent: next };
};
