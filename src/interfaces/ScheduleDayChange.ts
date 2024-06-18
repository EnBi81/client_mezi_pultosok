export interface ScheduleDayChange {
  dateTime: number;
  displayDate: string;
  type: 'full' | 'partial';
  cikolaUpdateDetails: WorkerUpdate[];
  doborgazUpdateDetails: WorkerUpdate[];
}

export interface WorkerUpdate {
  workerName: string;
  type: 'added' | 'removed';
  timestamp: number;
}
