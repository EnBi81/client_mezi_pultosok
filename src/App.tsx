import {
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
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
                  data={workingDays}
                  renderItem={({ item }) => (
                    <>
                      <View style={{ marginHorizontal: 20 }}>
                        <WorkingDayCard
                          schedule={item}
                          colorPalette={colorPalette}
                        />
                      </View>
                      {new Date(item.date).getDay() === 0 && (
                        <View style={styles.weekDivider}></View>
                      )}
                    </>
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
    height: 1,
    paddingVertical: 30,
  },
});
