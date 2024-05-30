import {
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { usePultosokData } from './hooks/pultosokData/usePultosokData';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from 'react-native-linear-gradient';
import { WorkingDayCardSkeleton } from './components/WorkingDayCardSkeleton';
import { ErrorCard } from './components/ErrorCard';
import { UpdateButton } from './components/UpdateButton';
import { useGlobalColorPalette } from './hooks/useGlobalColorPalette';
import {
  usePultosokAppDisplayData,
  WorkingDayListObjectOptimized,
} from './hooks/pultosokData/usePultosokAppDisplayData';
import './PushNotificationsConfig';
import PushNotification, { Importance } from 'react-native-push-notification';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

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

  useEffect(() => {
    const requestNotificationPermission = async () => {
      const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      console.log('notification perm: ', result);
      if (result !== RESULTS.GRANTED) {
        const requestResult = await request(
          PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        );
        console.log('notification request result: ', requestResult);
      }
    };

    requestNotificationPermission()
      .then(() => console.log('notification request success'))
      .catch((err) => console.log('notification request error: ', err));

    PushNotification.createChannel(
      {
        channelId: 'default', // (required)
        channelName: 'Default channel', // (required)
        channelDescription: 'A default channel', // (optional) default: undefined.
        importance: Importance.HIGH, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel 'default' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );

    setTimeout(() => {
      return;
      console.log('show notification');
      PushNotification.localNotification({
        ticker: '',
        userInfo: undefined,
        channelId: 'default',
        title: 'My Notification Title',
        message: 'My Notification Message',
      });
    }, 2000);

    PushNotification.getChannels(function (channels) {
      console.log(channels);
    });
  }, []);

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
          <UpdateButton />

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
  workingDayContainer: {
    gap: 2,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#EBEAED',
  },
  tasksWrapper: {
    paddingTop: 30,
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
});
