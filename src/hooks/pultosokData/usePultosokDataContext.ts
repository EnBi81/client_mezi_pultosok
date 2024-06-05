import { useContext } from 'react';
import { PultosokDataContext } from '../../schedule_data/PultosokDataContext';

export const usePultosokDataContext = () => {
  const context = useContext(PultosokDataContext);
  return context;
};
