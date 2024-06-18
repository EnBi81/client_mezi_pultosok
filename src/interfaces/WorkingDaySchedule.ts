import { ScheduleDayChange } from './ScheduleDayChange';

export interface WorkingDaySchedule {
  date: string;
  dateStringShort: string;
  dayOfWeekString: string;
  lastModifiedDate: number | undefined;
  markedAsReadTime: number | undefined;
  cikola: string[];
  doborgaz: string[];
  change: ScheduleDayChange | undefined;
}
