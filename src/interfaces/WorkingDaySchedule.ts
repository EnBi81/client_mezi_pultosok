export interface WorkingDaySchedule {
  date: string;
  dateStringShort: string;
  dayOfWeekString: string;
  isNew: boolean | undefined;
  isNewDateRegistered: number | undefined;
  cikola: string[];
  doborgaz: string[];
}
