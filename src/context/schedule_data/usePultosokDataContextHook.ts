import { useEffect, useState } from 'react';
import { WorkingDaySchedule } from '../../interfaces/WorkingDaySchedule';

import { usePultosokDataNetworking } from './usePultosokDataNetworking';
import { toast } from '../../utils/utils';
import { useLocale } from '../../hooks/useLocale';
import { storages } from '../../storage/Storages';
import { ScheduleComparison } from '../../utils/ScheduleComparison';
import { useAppState } from '../../hooks/useAppState';
import { SharedPreferences } from '../../shared_preferences/SharedPreferences';

export const usePultosokDataContextHook = () => {
  const { refresh, data: networkingData, isRefreshing, error: networkingError } = usePultosokDataNetworking();
  const cacheStorage = storages.schedule();
  const [workingDays, setWorkingDays] = useState<WorkingDaySchedule[]>();
  const { l } = useLocale();
  const { onFocusCounter } = useAppState();
  const [errorToastShown, setErrorToastShown] = useState(false);

  // handling cache x network data
  useEffect(() => {
    cacheStorage.get().then((cachedData) => {
      // if no data is available, skip
      if (cachedData === undefined && !networkingData) {
        return;
      }

      // if only the cache data is available, load that
      if (cachedData && !networkingData) {
        setWorkingDays(cachedData.data);
        return;
      }

      // networkingData is not null here, but the compiler needs to also understand that
      if (!networkingData) return;

      const comparisonResult = ScheduleComparison.compare(cachedData?.data ?? [], networkingData);

      if (cachedData !== undefined) {
        ScheduleComparison.showNotifications(comparisonResult.changes).catch((e) =>
          console.log('error while invoking notifications: ', e),
        );
      }

      const scheduleData = comparisonResult.processedSchedule;

      setWorkingDays(scheduleData);
    });
  }, [networkingData]);

  // sending data to the widget
  useEffect(() => {
    SharedPreferences.pultosok.set(workingDays);
  }, [workingDays]);

  // displaying error toasts
  useEffect(() => {
    if (networkingError.isError && !errorToastShown) {
      if (networkingError.isNetworkError) toast(l.schedule.networking.networkError);
      else toast(l.schedule.networking.dataError);
      setErrorToastShown(true);
    } else {
      setErrorToastShown(false);
    }
  }, [networkingData, networkingError]);

  // auto refresh data on focus
  useEffect(() => {
    if (onFocusCounter > 0) refresh();
  }, [onFocusCounter]);

  // cache data
  useEffect(() => {
    if (workingDays) {
      cacheStorage.store({ cacheTime: new Date().getTime(), data: workingDays });
    }
  }, [workingDays]);

  const markAllAsRead = () => {
    if (!workingDays) return;

    const markedAsReadTime = new Date().getTime();

    const markedRead: WorkingDaySchedule[] = workingDays.map((day) => ({
      ...day,
      markedAsReadTime: markedAsReadTime,
    }));

    setWorkingDays(markedRead);
  };

  return {
    workingDays,
    refresh: refresh,
    isRefreshing,
    error: networkingError,
    markAllAsRead: () => markAllAsRead(),
  };
};
