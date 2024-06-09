import { useContext } from 'react';
import { PultosokDataContext } from '../context/schedule_data/PultosokDataContext';

export const usePultosokDataContext = () => {
  const { isRefreshing, refresh, error, workingDays, markAllAsRead } = useContext(PultosokDataContext);
  return { isRefreshing, refresh, error, workingDays, markAllAsRead };
};
