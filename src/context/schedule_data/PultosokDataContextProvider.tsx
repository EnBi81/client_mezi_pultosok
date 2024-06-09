import { usePultosokData } from './usePultosokData';
import { PultosokDataContext } from './PultosokDataContext';

export const PultosokDataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { refresh, isRefreshing, error, workingDays, markAllAsRead } = usePultosokData();

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
