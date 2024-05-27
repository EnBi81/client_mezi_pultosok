import React, { useMemo } from 'react';
import {
  isWorkingDayScheduleWeekDivider,
  WorkingDayScheduleWeekDivider,
} from '../../interfaces/WorkingDayScheduleWeekDivider';
import { getWeekNumber } from '../../utils';
import { WorkingDayCard } from '../../components/WorkingDayCard';
import { WorkingDayScheduleWeekDividerCard } from '../../components/WorkingDayScheduleWeekDividerCard';
import { WorkingDaySchedule } from '../../interfaces/WorkingDaySchedule';
import { StyleSheet, View, Text } from 'react-native';
import { useGlobalColorPalette } from '../useGlobalColorPalette';

type WorkingDayListObject =
  | WorkingDaySchedule
  | WorkingDayScheduleWeekDivider
  | 'space';

export const usePultosokAppDisplayData = (
  workingDays: WorkingDaySchedule[] | undefined,
) => {
  const { colorPalette } = useGlobalColorPalette();

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

  // render a working day list item
  const renderWorkingDayListObject = ({
    item,
  }: {
    item: WorkingDayListObject;
  }) => {
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
              text={`Week ${item.numberOfWeek} - ${item.displayDate}`}
            />
          </View>
        </View>
      );
    }

    return (
      <View>
        <Text>This should not be seen</Text>
      </View>
    );
  };

  return {
    workingDaysWithDividers,
    stickyHeaderIndices,
    renderWorkingDayListObject,
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
