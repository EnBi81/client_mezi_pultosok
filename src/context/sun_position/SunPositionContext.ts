import { createContext } from 'react';
import { SunEvent } from '../../interfaces/SunEvent';

interface SunPositionContextInterface {
  next: SunEvent | undefined;
}

export const SunPositionContextDefaultValue: SunPositionContextInterface = {
  next: undefined,
};

export const SunPositionContext = createContext<SunPositionContextInterface>(SunPositionContextDefaultValue);
