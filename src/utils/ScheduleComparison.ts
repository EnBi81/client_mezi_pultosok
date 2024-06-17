import { WorkingDaySchedule } from '../interfaces/WorkingDaySchedule';
import { getUniqueElements } from './utils';

export const ScheduleComparison = {
  compare: (scheduleOld: WorkingDaySchedule[], scheduleNew: WorkingDaySchedule[]) => {
    scheduleNew = JSON.parse(JSON.stringify(scheduleNew));
    const now = new Date();
    const nowTime = now.getTime();

    const changes: ScheduleDayChange[] = [];

    for (const day of scheduleNew) {
      day.cikola = getUniqueElements(day.cikola);
      day.doborgaz = getUniqueElements(day.doborgaz);

      const oldDay = scheduleOld.find((d) => d.date === day.date);

      if (oldDay === undefined) {
        // never seen new day
        day.lastModifiedDate = nowTime;
        changes.push({
          cikolaUpdate: 'full',
          cikolaUpdateDetails: compareWorkerArrays([], day.cikola),
          doborgazUpdate: 'full',
          doborgazUpdateDetails: compareWorkerArrays([], day.doborgaz),
        });
        continue;
      }

      // copying old properties to new
      day.markedAsReadTime = oldDay.markedAsReadTime;
      day.lastModifiedDate = oldDay.lastModifiedDate ?? nowTime;

      let isChanged = false;
      const change: ScheduleDayChange = {
        cikolaUpdate: 'full',
        cikolaUpdateDetails: [],
        doborgazUpdate: 'full',
        doborgazUpdateDetails: [],
      };

      // check cikola changes
      const cikolaComparison = compareWorkerArrays(oldDay.cikola, day.cikola);
      if (cikolaComparison.length > 0) {
        isChanged = true;
        change.cikolaUpdate = oldDay.cikola.length === 0 ? 'full' : 'partial';
        change.cikolaUpdateDetails = cikolaComparison;
      }

      // check doborgaz changes
      const doborgazComparison = compareWorkerArrays(oldDay.doborgaz, day.doborgaz);
      if (doborgazComparison.length > 0) {
        isChanged = true;
        change.doborgazUpdate = oldDay.doborgaz.length === 0 ? 'full' : 'partial';
        change.doborgazUpdateDetails = doborgazComparison;
      }

      // evaluating changes
      if (isChanged) {
        changes.push(change);
        day.lastModifiedDate = nowTime;
      }
    }

    return { changes, processedSchedule: scheduleNew };
  },
};

export interface ScheduleDayChange {
  cikolaUpdate: 'full' | 'partial';
  cikolaUpdateDetails: WorkerUpdate[];
  doborgazUpdate: 'full' | 'partial';
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
