export interface WorkingDaySchedule {
  date: string;
  dateStringShort: string;
  dateStringLong: string;
  isNew: boolean | undefined;
  isNewDateRegistered: number | undefined;
  cikola: string[];
  doborgaz: string[];
}
