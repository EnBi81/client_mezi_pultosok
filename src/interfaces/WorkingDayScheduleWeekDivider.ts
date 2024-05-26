export interface WorkingDayScheduleWeekDivider {
  displayDate: string;
  numberOfWeek: number;
}

export function isWorkingDayScheduleWeekDivider(object: any) {
  if (object === undefined) return false;
  if (typeof object !== 'object') return false;
  return 'displayDate' in object && 'numberOfWeek' in object;
}
