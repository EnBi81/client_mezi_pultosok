import { useEffect, useState } from 'react';
import { WorkingDaySchedule } from '../../interfaces/WorkingDaySchedule';
import { useLocale } from '../../hooks/useLocale';
import { PultosokDataError } from '../../interfaces/PultosokDataError';
import { endpoints } from '../../api/endpoints';

export const usePultosokDataNetworking = () => {
  const [workingDays, setWorkingDays] = useState<WorkingDaySchedule[]>();
  const [error, setError] = useState<PultosokDataError>({
    errorMessage: undefined,
    isError: false,
    isNetworkError: false,
  });
  const [counter, setCounter] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { l, currentLocale } = useLocale();

  useEffect(() => {
    setIsRefreshing(true);

    endpoints
      .scheduleData({ locale: l, localeCode: currentLocale })
      .then((result) => {
        setIsRefreshing(false);

        if (result.error) {
          setError({
            isError: true,
            errorMessage: result.error.errorMessage,
            isNetworkError: result.error.isNetworkError,
          });
          return;
        }

        if (!result.data) {
          setError({
            isError: true,
            errorMessage: "Haven't received any data",
            isNetworkError: false,
          });
          return;
        }

        setError({
          isError: false,
          errorMessage: undefined,
          isNetworkError: false,
        });

        const data = result.data;
        setWorkingDays(data);
      })
      .catch((err) => {
        setIsRefreshing(false);
        console.error(err);
        setError({
          isError: true,
          errorMessage: err.message,
          isNetworkError: false,
        });
      });
  }, [counter, l, currentLocale]);

  function refresh() {
    setCounter((prev) => prev + 1);
  }

  return {
    data: workingDays,
    isRefreshing,
    error,
    refresh: refresh,
  };
};
