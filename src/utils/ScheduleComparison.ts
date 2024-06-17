import { WorkingDaySchedule } from '../interfaces/WorkingDaySchedule';
import { getUniqueElements, removeEmptyStrings } from './utils';
import { useNotificationService } from '../hooks/useNotificationService';
import { storages } from '../storage/Storages';
import { getCurrentLocalTranslations } from '../context/locale/locales';

export const ScheduleComparison = {
  compare: (scheduleOld: WorkingDaySchedule[], scheduleNew: WorkingDaySchedule[]) => {
    scheduleNew = JSON.parse(JSON.stringify(scheduleNew));
    const now = new Date();
    const nowTime = now.getTime();

    const changes: ScheduleDayChange[] = [];

    for (const day of scheduleNew) {
      day.cikola = removeEmptyStrings(getUniqueElements(day.cikola));
      day.doborgaz = removeEmptyStrings(getUniqueElements(day.doborgaz));

      const oldDay = scheduleOld.find((d) => d.date === day.date);

      if (oldDay === undefined) {
        // never seen new day
        day.lastModifiedDate = nowTime;
        changes.push({
          dateTime: new Date(day.date).getTime(),
          displayDate: day.dateStringShort,
          type: 'full',
          cikolaUpdateDetails: compareWorkerArrays([], day.cikola),
          doborgazUpdateDetails: compareWorkerArrays([], day.doborgaz),
        });
        continue;
      }

      // copying old properties to new
      day.markedAsReadTime = oldDay.markedAsReadTime;
      day.lastModifiedDate = oldDay.lastModifiedDate ?? nowTime;

      let isChanged = false;
      const change: ScheduleDayChange = {
        dateTime: new Date(day.date).getTime(),
        displayDate: day.dateStringShort,
        type: 'full',
        cikolaUpdateDetails: [],
        doborgazUpdateDetails: [],
      };

      // check cikola changes
      const cikolaComparison = compareWorkerArrays(oldDay.cikola, day.cikola);
      if (cikolaComparison.length > 0) {
        isChanged = true;
        change.cikolaUpdateDetails = cikolaComparison;
      }

      // check doborgaz changes
      const doborgazComparison = compareWorkerArrays(oldDay.doborgaz, day.doborgaz);
      if (doborgazComparison.length > 0) {
        isChanged = true;
        change.doborgazUpdateDetails = doborgazComparison;
      }

      change.type = isChanged && oldDay.cikola.length === 0 && oldDay.doborgaz.length === 0 ? 'full' : 'partial';

      // evaluating changes
      if (isChanged) {
        changes.push(change);
        day.lastModifiedDate = nowTime;
      }
    }

    return { changes, processedSchedule: scheduleNew };
  },
  showNotifications: async (changes: ScheduleDayChange[]) => {
    if (changes.length === 0) return;

    const settingsStorage = storages.settings();

    const settings = await settingsStorage.get();
    if (!settings?.notifications.scheduleUpdates) {
      return;
    }

    const partialDays = changes.filter((c) => c.type === 'partial');
    const fullDays = changes.filter((c) => c.type === 'full');

    const notificationsData: PartialChangeNotificationData[] = partialDays
      .map((day) => {
        const arr: PartialChangeNotificationData[] = [];

        const cikolaAdded = day.cikolaUpdateDetails.filter((c) => c.type === 'added');
        if (cikolaAdded.length > 0) {
          arr.push({
            title: day.displayDate + ' (Cikola)',
            message: cikolaAdded.map((w) => w.workerName).join(', ') + ' will be working',
          });
        }

        const cikolaRemoved = day.cikolaUpdateDetails.filter((c) => c.type === 'removed');
        if (cikolaRemoved.length > 0) {
          arr.push({
            title: day.displayDate + ' (Cikola)',
            message: cikolaRemoved.map((w) => w.workerName).join(', ') + ' has been taken off the schedule',
          });
        }

        const doborgazAdded = day.doborgazUpdateDetails.filter((d) => d.type === 'added');
        if (doborgazAdded.length > 0) {
          arr.push({
            title: day.displayDate + ' (Doborgaz)',
            message: doborgazAdded.map((w) => w.workerName).join(', ') + ' will be working',
          });
        }

        const doborgazRemoved = day.doborgazUpdateDetails.filter((d) => d.type === 'removed');
        if (doborgazRemoved.length > 0) {
          arr.push({
            title: day.displayDate + ' (Doborgaz)',
            message: doborgazRemoved.map((w) => w.workerName).join(', ') + ' has been taken off the schedule',
          });
        }

        return arr;
      })
      .reduce((arr, current) => [...arr, ...current], []);

    if (fullDays.length > 1) {
      const firstFullDay = fullDays.reduce((first, current) => (first.dateTime < current.dateTime ? first : current));
      const lastFullDay = fullDays.reduce((last, current) => (last.dateTime > current.dateTime ? last : current));

      notificationsData.push({
        title: 'New Days Added',
        message: `New Days added from ${firstFullDay.displayDate} to ${lastFullDay.displayDate}`,
      });
    } else if (fullDays.length === 1) {
      notificationsData.push({
        title: 'New Day Added',
        message: `New Day added: ${fullDays[0].displayDate}`,
      });
    }

    const { notifications } = useNotificationService();
    const locale = getCurrentLocalTranslations(settings);

    notifications.checkWorkersChangedSummaryExists({
      isTest: false,
      callback: (exists) => {
        for (let i = 0; i < notificationsData.length; i++) {
          const notification = notificationsData[i];
          const isFirstNotification = i === 0;

          notifications.sendWorkersChangedNotification({
            isTest: false,
            locale: locale,
            title: notification.title,
            message: notification.message,
            groupSummary: !exists ? isFirstNotification : false,
          });
        }
      },
    });
  },
};

export interface ScheduleDayChange {
  dateTime: number;
  displayDate: string;
  type: 'full' | 'partial';
  cikolaUpdateDetails: WorkerUpdate[];
  doborgazUpdateDetails: WorkerUpdate[];
}

interface WorkerUpdate {
  workerName: string;
  type: 'added' | 'removed';
}

const compareWorkerArrays = (workersOld: string[], workersNew: string[]): WorkerUpdate[] => {
  const arr: WorkerUpdate[] = [];

  for (const worker of workersNew) {
    const oldWorker = workersOld.find((w) => w === worker);

    if (oldWorker === undefined) {
      arr.push({
        workerName: worker,
        type: 'added',
      });
    }
  }

  for (const oldWorker of workersOld) {
    const newWorker = workersNew.find((w) => w === oldWorker);

    if (newWorker === undefined) {
      arr.push({
        workerName: oldWorker,
        type: 'removed',
      });
    }
  }

  return arr;
};

interface PartialChangeNotificationData {
  title: string;
  message: string;
}
