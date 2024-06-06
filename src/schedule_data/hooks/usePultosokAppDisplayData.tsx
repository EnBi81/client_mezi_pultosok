import React, { memo, useMemo } from 'react';
import {
  isWorkingDayScheduleWeekDivider,
  WorkingDayScheduleWeekDivider,
} from '../../interfaces/WorkingDayScheduleWeekDivider';
import { formatString, getWeekNumber } from '../../utils';
import { WorkingDayCard } from '../../components/schedule/WorkingDayCard';
import { WorkingDayScheduleWeekDividerCard } from '../../components/schedule/WorkingDayScheduleWeekDividerCard';
import { WorkingDaySchedule } from '../../interfaces/WorkingDaySchedule';
import { StyleSheet, View, Text } from 'react-native';
import { useGradientPalette } from '../../hooks/useGradientPalette';
import { useLocale } from '../../locale/hooks/useLocale';

type WorkingDayListObject =
  | WorkingDaySchedule
  | WorkingDayScheduleWeekDivider
  | 'space';

export const usePultosokAppDisplayData = (
  workingDays: WorkingDaySchedule[] | undefined,
) => {
  // create a new array based on the working days,
  // but add the week dividers and spaces
  const workingDaysWithDividers: WorkingDayListObject[] | undefined =
    useMemo(() => {
      if (!Array.isArray(workingDays)) return;

      const data: WorkingDayListObject[] = [];

      for (let i = 0; i < workingDays.length; i++) {
        const day = workingDays[i];

        const date = new Date(day.date);
        const isMonday = date.getDay() === 1;

        if (isMonday || i === 0) {
          const weekDivider: WorkingDayScheduleWeekDivider = {
            displayDate: `${day.dateStringShort}`,
            numberOfWeek: getWeekNumber(date).weekNo,
          };

          if (i !== 0) data.push('space');
          data.push(weekDivider);
        }

        data.push(day);
      }

      return data;
    }, [workingDays]);

  // get the sticky header indices for the week dividers
  const stickyHeaderIndices: number[] = useMemo(() => {
    if (!Array.isArray(workingDaysWithDividers)) return [];

    return workingDaysWithDividers
      .map((item, index) => ({
        index: index,
        iwWeekDivider: isWorkingDayScheduleWeekDivider(item),
      }))
      .filter((item) => item.iwWeekDivider)
      .map((item) => item.index);
  }, [workingDaysWithDividers]);

  return {
    workingDaysWithDividers,
    stickyHeaderIndices,
  };
};

const styles = StyleSheet.create({
  weekDivider: {
    width: '100%',
  },
  weekDividerSpace: {
    height: 1,
    marginVertical: 15,
  },
});

// render a working day list item
export const WorkingDayListObject = ({
  item,
}: {
  item: WorkingDayListObject;
}) => {
  const { l } = useLocale();
  const { colorPalette } = useGradientPalette();

  if (item === 'space') {
    return <View style={styles.weekDividerSpace}></View>;
  }

  if ('cikola' in item) {
    return (
      <View style={{ marginHorizontal: 20 }}>
        <WorkingDayCard schedule={item} colorPalette={colorPalette} />
      </View>
    );
  }

  if ('numberOfWeek' in item) {
    return (
      <View style={{ marginHorizontal: 10 }}>
        <View style={styles.weekDivider}>
          <WorkingDayScheduleWeekDividerCard
            text={`${formatString(l.schedule.weekNumber, item.numberOfWeek)} - ${item.displayDate}`}
          />
        </View>
      </View>
    );
  }

  return (
    <View>
      <Text>{l.schedule.thisShouldNotBeSeen}</Text>
    </View>
  );
};

export const WorkingDayListObjectOptimized = memo(WorkingDayListObject);
