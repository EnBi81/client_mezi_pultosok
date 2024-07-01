import PultosokSharedPreferences from 'react-native-shared-preferences';
import { WorkingDaySchedule } from '../interfaces/WorkingDaySchedule';
import { OSPlatform } from '../utils/OSPlatform';

export const SharedPreferences = {
  pultosok: {
    set: (schedule: WorkingDaySchedule[] | undefined) => {
      if (!schedule) return;

      const data = schedule.map((day) => ({
        date: day.date,
        cikola: day.cikola,
        doborgaz: day.doborgaz,
        dateStringShort: day.dateStringShort,
        dayOfWeekString: day.dayOfWeekString,
        markedAsReadTime: day.markedAsReadTime,
        lastModifiedDate: day.lastModifiedDate,
      }));

      const set = OSPlatform.select({
        android: () => { 
          PultosokSharedPreferences.setName('com.client_mezi_pultosok.PultosokSharedPreferences');
          PultosokSharedPreferences.setItem('apiData', JSON.stringify(data));
        },
        ios: () => {
           
        }
      });

      set();
    },
  },
};
