import { createContext } from 'react';
import { usePultosokData } from './usePultosokData';
import { WorkingDaySchedule } from '../interfaces/WorkingDaySchedule';
import { PultosokDataError } from '../interfaces/PultosokDataError';

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

export const PultosokDataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { refresh, isRefreshing, error, workingDays, markAllAsRead } =
    usePultosokData();

  return (
    <PultosokDataContext.Provider
      value={{
        workingDays: workingDays,
        refresh: refresh,
        isRefreshing: isRefreshing,
        error: error,
        markAllAsRead: markAllAsRead,
      }}
    >
      {children}
    </PultosokDataContext.Provider>
  );
};
