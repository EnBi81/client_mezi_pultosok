import {
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React from 'react';
import { View } from 'react-native';
import { usePultosokData } from './hooks/pultosokData/usePultosokData';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from 'react-native-linear-gradient';
import { WorkingDayCardSkeleton } from './components/schedule-page/WorkingDayCardSkeleton';
import { ErrorCard } from './components/schedule-page/ErrorCard';
import { UpdateButton } from './components/schedule-page/UpdateButton';
import { useGlobalColorPalette } from './hooks/useGlobalColorPalette';
import {
  usePultosokAppDisplayData,
  WorkingDayListObjectOptimized,
} from './hooks/pultosokData/usePultosokAppDisplayData';
import './notifications/PushNotificationsConfig';
import { SettingsCircularButton } from './components/settings/SettingsCircularButton';

export default function App() {
  const { colorPalette } = useGlobalColorPalette();

  const {
    workingDays,
    refresh: refreshPultosok,
    isRefreshing,
    error: pultosokDataError,
  } = usePultosokData();

  const { workingDaysWithDividers, stickyHeaderIndices } =
    usePultosokAppDisplayData(workingDays);

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LinearGradient
          colors={colorPalette.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.maxSize}
        >
          {/* Download & Update Button */}
          <UpdateButton />

          <View style={styles.settingsView}>
            <LinearGradient
              colors={['#00000080', 'transparent']}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={[styles.maxSize, styles.settingsButtonPositionContainer]}
            >
              <View style={styles.settingsButtonWrapper}>
                <SettingsCircularButton
                  onPress={() => console.log('settings press')}
                />
              </View>
            </LinearGradient>
          </View>

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
                  removeClippedSubviews={true}
                  initialNumToRender={25}
                  data={workingDaysWithDividers}
                  stickyHeaderIndices={stickyHeaderIndices}
                  renderItem={(params) => (
                    <WorkingDayListObjectOptimized item={params.item} />
                  )}
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
    paddingTop: 30,
    paddingHorizontal: 0,
  },
  settingsView: {
    position: 'absolute',
    width: '100%',
    height: 100,
    bottom: 0,
    zIndex: 1,
  },
  settingsButtonWrapper: {
    height: 60,
    width: 60,
  },
  settingsButtonPositionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
});
