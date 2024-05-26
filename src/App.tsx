import {
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useMemo } from 'react';
import { WorkingDayCard } from './components/WorkingDayCard';
import { View, Text } from 'react-native';
import { usePultosokData } from './hooks/usePultosokData';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from 'react-native-linear-gradient';
import { CURRENT_APK_VERSION } from './constants';
import { useApkUpdater } from './hooks/useApkUpdater';
import { ColorPalettes } from './colorPalettes';
import { WorkingDayCardSkeleton } from './components/WorkingDayCardSkeleton';
import { ErrorCard } from './components/ErrorCard';
import {
  WorkingDayScheduleWeekDivider,
  isWorkingDayScheduleWeekDivider,
} from './interfaces/WorkingDayScheduleWeekDivider';
import { WorkingDaySchedule } from './interfaces/WorkingDaySchedule';
import { WorkingDayScheduleWeekDividerCard } from './components/WorkingDayScheduleWeekDividerCard';
import { getWeekNumber } from './utils';

type WorkingDayListObject =
  | WorkingDaySchedule
  | WorkingDayScheduleWeekDivider
  | 'space';

export default function App() {
  const {
    workingDays,
    refresh: refreshPultosok,
    isRefreshing,
    error: pultosokDataError,
  } = usePultosokData();

  const {
    latestApkVersion,
    isUpdateAvailable,
    isDownloading,
    isDownloadCompleted,
    downloadPercent,
    downloadAndInstall,
  } = useApkUpdater();

  const colorPalettes = ColorPalettes;

  const today = new Date();
  const colorPalette =
    colorPalettes[(today.getDate() * 31) % colorPalettes.length];

  const workingDaysWithDividers = useMemo(() => {
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

  const stickyHeaderIndices = useMemo(() => {
    if (!Array.isArray(workingDaysWithDividers)) return [];

    return workingDaysWithDividers
      .map((item, index) => ({
        index: index,
        iwWeekDivider: isWorkingDayScheduleWeekDivider(item),
      }))
      .filter((item) => item.iwWeekDivider)
      .map((item) => item.index);
  }, [workingDaysWithDividers]);

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LinearGradient
          colors={colorPalette.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Download & Update Button */}
          {isUpdateAvailable && (
            <TouchableOpacity
              style={{
                ...styles.updateButtonWrapper,
                backgroundColor:
                  isDownloading || isDownloadCompleted ? '#ccc' : '#62a4ff',
              }}
              onPress={() => downloadAndInstall()}
            >
              <View
                style={{
                  ...styles.updateButtonProgressBar,
                  width: `${downloadPercent ?? 0}%`,
                }}
              ></View>
              <Text style={styles.updateButton}>
                {isDownloading && `Downloading update... (${downloadPercent}%)`}
                {!isDownloading &&
                  `Update to ${latestApkVersion} (current: ${CURRENT_APK_VERSION})`}
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.tasksWrapper}>
            <SafeAreaView>
              {!workingDays && pultosokDataError.isError && (
                <View style={{ marginHorizontal: 20 }}>
                  <ErrorCard
                    errorText={
                      pultosokDataError.errorMessage ??
                      'Unexpected error occured.'
                    }
                  />
                </View>
              )}

              {/* Loading Object */}
              {!workingDays && !pultosokDataError.isError && (
                <View style={{ marginHorizontal: 20 }}>
                  <WorkingDayCardSkeleton />
                  <WorkingDayCardSkeleton />
                  <WorkingDayCardSkeleton />
                  <WorkingDayCardSkeleton />
                </View>
              )}

              {/* Data View */}
              {workingDays && (
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={isRefreshing}
                      onRefresh={refreshPultosok}
                    />
                  }
                  data={workingDaysWithDividers}
                  stickyHeaderIndices={stickyHeaderIndices}
                  renderItem={({ item }) => {
                    const isWorkingDaySchedule =
                      !isWorkingDayScheduleWeekDivider(item);

                    if (item === 'space') {
                      return <View style={styles.weekDividerSpace}></View>;
                    }

                    if (isWorkingDaySchedule) {
                      return (
                        <View style={{ marginHorizontal: 20 }}>
                          <WorkingDayCard
                            schedule={item}
                            colorPalette={colorPalette}
                          />
                        </View>
                      );
                    }

                    return (
                      <View style={{ marginHorizontal: 10 }}>
                        <View style={styles.weekDivider}>
                          <WorkingDayScheduleWeekDividerCard
                            text={`Week ${item.numberOfWeek} - ${item.displayDate}`}
                          />
                        </View>
                      </View>
                    );
                  }}
                />
              )}
            </SafeAreaView>
          </View>
        </LinearGradient>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  workingDayContainer: {
    gap: 2,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#EBEAED',
  },
  tasksWrapper: {
    paddingTop: 50,
    paddingHorizontal: 0,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  loadingContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loadingContainerInner: {
    width: '90%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'white',
    borderRadius: 10,
  },
  loadingText: {
    fontSize: 24,
  },
  updateButtonWrapper: {
    width: '100%',
    height: 40,
    backgroundColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  updateButton: {
    backgroundColor: '#00000000',
    fontSize: 20,
    color: 'black',
  },
  updateButtonProgressBar: {
    height: '100%',
    backgroundColor: '#62a4ff',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  weekDivider: {
    width: '100%',
  },
  weekDividerSpace: {
    height: 1,
    marginVertical: 15,
  },
});
