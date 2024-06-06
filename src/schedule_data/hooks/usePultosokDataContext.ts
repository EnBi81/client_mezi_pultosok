import { useContext } from 'react';
import { PultosokDataContext } from '../context_hooks/PultosokDataContext';

export const usePultosokDataContext = () => {
  const context = useContext(PultosokDataContext);
  return context;
};
