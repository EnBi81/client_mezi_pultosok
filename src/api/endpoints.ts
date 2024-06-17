import { API_ENDPOINT } from '../utils/constants';
import { WorkingDaySchedule } from '../interfaces/WorkingDaySchedule';
import { LanguageTranslation } from '../interfaces/LanguageTranslation';

export const endpoints = {
  latestApkVersion: (): Promise<string> => {
    return new Promise((resolve, reject) => {
      fetch(`${API_ENDPOINT}/apk-version`)
        .then((data) => {
          if (!data.ok) throw new Error('Error while checking apk version: ' + data.statusText);

          return data.text();
        })
        .then((latestApkVersion) => {
          if (/[.\d]*/.test(latestApkVersion)) {
            resolve(latestApkVersion);
          } else {
            reject('Invalid APK version received.');
          }
        })
        .catch((err) => {
          console.error('Error while requesting latest apk version: ', err);
        });
    });
  },
  scheduleData: async ({
    locale,
    localeCode,
  }: {
    locale: LanguageTranslation;
    localeCode?: string | undefined;
  }): Promise<{
    data: WorkingDaySchedule[] | undefined;
    error: { isNetworkError: boolean; errorMessage: string } | undefined;
  }> => {
    const timezoneOffset = new Date().getTimezoneOffset();

    let response;
    try {
      response = await fetch(`${API_ENDPOINT}/spreadsheet-data?tzo=${timezoneOffset}`);
    } catch (e) {
      return {
        data: undefined,
        error: {
          isNetworkError: true,
          errorMessage: 'Could not connect to the server',
        },
      };
    }

    if (!response.ok) {
      return {
        data: undefined,
        error: {
          isNetworkError: false,
          errorMessage: 'Response error code: ' + response.status,
        },
      };
    }

    const json = await response.json();

    if (json === undefined || json.data === undefined) {
      return {
        data: undefined,
        error: {
          isNetworkError: false,
          errorMessage: 'Data Error: Response is undefined',
        },
      };
    }

    const days = json.data;
    if (!Array.isArray(days)) {
      return {
        data: undefined,
        error: {
          isNetworkError: false,
          errorMessage: 'Data Error: data is not an array',
        },
      };
    }

    const getDayOfWeek = (dayNum: number) => {
      if (dayNum === 0) return locale.schedule.daysOfWeek.sunday;
      else if (dayNum === 1) return locale.schedule.daysOfWeek.monday;
      else if (dayNum === 2) return locale.schedule.daysOfWeek.tuesday;
      else if (dayNum === 3) return locale.schedule.daysOfWeek.wednesday;
      else if (dayNum === 4) return locale.schedule.daysOfWeek.thursday;
      else if (dayNum === 5) return locale.schedule.daysOfWeek.friday;
      else if (dayNum === 6) return locale.schedule.daysOfWeek.saturday;
      return 'Invalid day number';
    };

    const schedules: WorkingDaySchedule[] = days.map((d): WorkingDaySchedule => {
      const date = new Date(d.date);

      let shortDate;

      try {
        shortDate = date.toLocaleDateString(localeCode, {
          dateStyle: 'short',
        });
      } catch (e) {
        shortDate = date.toLocaleDateString(undefined, {
          dateStyle: 'short',
        });
      }

      return {
        ...d,
        lastModifiedDate: undefined,
        dateStringShort: shortDate,
        dayOfWeekString: getDayOfWeek(date.getDay()),
      };
    });

    return {
      data: schedules,
      error: undefined,
    };
  },
};
