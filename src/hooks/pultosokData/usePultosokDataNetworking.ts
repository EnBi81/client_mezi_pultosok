import { useEffect, useState } from 'react';
import { WorkingDaySchedule } from '../../interfaces/WorkingDaySchedule';
import { API_ENDPOINT } from '../../constants';
import { useLocale } from '../useLocale';

export const usePultosokDataNetworking = () => {
  const [workingDays, setWorkingDays] = useState<WorkingDaySchedule[]>();
  const [error, setError] = useState<{
    isError: boolean;
    errorMessage: string | undefined;
    isNetworkError: boolean;
  }>({
    errorMessage: undefined,
    isError: false,
    isNetworkError: false,
  });
  const [counter, setCounter] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { l } = useLocale();

  const getDayOfWeek = (dayNum: number) => {
    if (dayNum === 0) return l.schedule.daysOfWeek.sunday;
    else if (dayNum === 1) return l.schedule.daysOfWeek.monday;
    else if (dayNum === 2) return l.schedule.daysOfWeek.tuesday;
    else if (dayNum === 3) return l.schedule.daysOfWeek.wednesday;
    else if (dayNum === 4) return l.schedule.daysOfWeek.thursday;
    else if (dayNum === 5) return l.schedule.daysOfWeek.friday;
    else if (dayNum === 6) return l.schedule.daysOfWeek.saturday;
    return 'Invalid day number';
  };

  useEffect(() => {
    setIsRefreshing(true);

    const timezoneOffset = new Date().getTimezoneOffset();
    fetch(`${API_ENDPOINT}/spreadsheet-data?tzo=${timezoneOffset}`)
      // catch network error
      .catch(() => {
        setError({
          isError: true,
          errorMessage: 'Could not connect to the server.',
          isNetworkError: true,
        });
      })
      // set is refreshing to false
      .then((data) => {
        setIsRefreshing(false);
        return data;
      })
      // handle response error
      .then((data) => {
        if (!data) return;

        if (!('ok' in data)) return;

        if (!data.ok) throw new Error('Error: ' + data.statusText);

        return data.json();
      })
      // handle success response
      .then((data) => {
        if (data === undefined) return;

        let arr = data.data;
        if (!Array.isArray(arr))
          throw new Error('Invalid data format from server.');

        const schedules: WorkingDaySchedule[] = arr.map(
          (d): WorkingDaySchedule => {
            const date = new Date(d.date);

            return {
              ...d,
              isNew: false,
              dateStringShort: date.toLocaleDateString(undefined, {
                dateStyle: 'short',
              }),
              dayOfWeekString: getDayOfWeek(date.getDay()),
            };
          },
        );

        setWorkingDays(schedules);
        setError({
          isError: false,
          errorMessage: undefined,
          isNetworkError: false,
        });
      })
      // handle error response
      .catch((err) => {
        console.error(err);
        setError({
          isError: true,
          errorMessage: err,
          isNetworkError: false,
        });
      });
  }, [counter]);

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
