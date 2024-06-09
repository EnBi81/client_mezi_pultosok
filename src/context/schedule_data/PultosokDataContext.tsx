import { createContext } from 'react';
import { WorkingDaySchedule } from '../../interfaces/WorkingDaySchedule';
import { PultosokDataError } from '../../interfaces/PultosokDataError';

interface PultosokDataContextData {
  refresh: () => void;
  isRefreshing: boolean;
  workingDays: WorkingDaySchedule[] | undefined;
  error: PultosokDataError;
  markAllAsRead: () => void;
}

export const PultosokDataContext = createContext<PultosokDataContextData>({
  refresh: () => {},
  isRefreshing: false,
  workingDays: undefined,
  error: {
    isError: false,
    errorMessage: '',
    isNetworkError: false,
  },
  markAllAsRead: () => {},
});
