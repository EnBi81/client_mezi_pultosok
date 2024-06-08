import { useGradientPalette } from '../colors_themes/hooks/useGradientPalette';
import {
  usePultosokAppDisplayData,
  WorkingDayListObjectOptimized,
} from '../schedule_data/hooks/usePultosokAppDisplayData';
import { LinearGradient } from 'react-native-linear-gradient';
import { ErrorCard } from '../components/schedule/ErrorCard';
import { WorkingDayCardSkeleton } from '../components/schedule/WorkingDayCardSkeleton';
import React from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SettingsUpdateWrapper } from '../components/schedule/SettingsUpdateWrapper';
import { usePultosokDataContext } from '../schedule_data/hooks/usePultosokDataContext';

export const SchedulePage = () => {
  const { colorPalette } = useGradientPalette();

  const { workingDays, refresh: refreshPultosok, isRefreshing, error: pultosokDataError } = usePultosokDataContext();

  const { workingDaysWithDividers, stickyHeaderIndices } = usePultosokAppDisplayData(workingDays);

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LinearGradient
          colors={colorPalette.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.maxSize}
        >
          <View pointerEvents={'none'} style={styles.settingsView}>
            <LinearGradient
              colors={['#00000080', 'transparent']}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={[styles.maxSize, styles.settingsButtonPositionContainer]}
            ></LinearGradient>
          </View>
          <View
            pointerEvents={'box-none'}
            style={{
              position: 'absolute',
              zIndex: 2,
              width: '100%',
              bottom: 0,
              right: 0,
              paddingHorizontal: 20,
              paddingBottom: 20,
            }}
          >
            <SettingsUpdateWrapper />
          </View>

          <View style={styles.tasksWrapper}>
            <SafeAreaView>
              {!workingDays && pultosokDataError.isError && (
                <View style={{ marginHorizontal: 20 }}>
                  <ErrorCard errorText={pultosokDataError.errorMessage ?? 'Unexpected error occured.'} />
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
                  refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshPultosok} />}
                  removeClippedSubviews={true}
                  initialNumToRender={25}
                  data={workingDaysWithDividers}
                  stickyHeaderIndices={stickyHeaderIndices}
                  renderItem={(params) => <WorkingDayListObjectOptimized item={params.item} />}
                />
              )}
            </SafeAreaView>
          </View>
        </LinearGradient>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  maxSize: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#EBEAED',
    position: 'relative',
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 0,
  },
  settingsView: {
    position: 'absolute',
    width: '100%',
    height: 100,
    bottom: 0,
    zIndex: 1,
  },
  settingsButtonPositionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
});
