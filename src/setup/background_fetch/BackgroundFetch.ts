import BackgroundFetch from 'react-native-background-fetch';
import { ApkUpdateChecker } from './routines/ApkUpdateChecker';

BackgroundFetch.configure(
  {
    minimumFetchInterval: 15, // Fetch interval in minutes
    stopOnTerminate: false, // Set false to continue background-fetch events after user terminates the app
    startOnBoot: true,
    requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY, // This job requires network connectivity.
    requiresBatteryNotLow: true,
    enableHeadless: true,
  },
  async (taskId) => {
    console.log(`[BackgroundFetch] [${new Date().toLocaleString()}] taskId: ${taskId}`);

    try {
      await ApkUpdateChecker();
      console.log(`[BackgroundFetch HeadlessTask] [${new Date().toLocaleString()}] Apk update checker fetched`);
    } catch (e) {
      console.log(`[BackgroundFetch HeadlessTask] [${new Date().toLocaleString()}] Error: `, e);
    }

    BackgroundFetch.finish(taskId);
  },
  (error) => {
    console.log(`[BackgroundFetch] [${new Date().toLocaleString()}] timed out: `, error);
  },
).then(() => {
  console.log(`[BackgroundFetch] [${new Date().toLocaleString()}] configured`);
});

let AppHeadlessTask = async (event) => {
  let taskId = event.taskId;
  let isTimeout = event.timeout; // <-- true when your background-time has expired.
  if (isTimeout) {
    console.log(`[BackgroundFetch] [${new Date().toLocaleString()}] Headless TIMEOUT: `, taskId);
    BackgroundFetch.finish(taskId);
    return;
  }

  try {
    await ApkUpdateChecker();
    console.log(`[BackgroundFetch HeadlessTask] [${new Date().toLocaleString()}] Apk update checker fetched`);
  } catch (e) {
    console.log(`[BackgroundFetch HeadlessTask] [${new Date().toLocaleString()}] Error: `, e);
  }

  BackgroundFetch.finish(taskId);
};

// Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(AppHeadlessTask);

// Optionally: Start the background fetch task
BackgroundFetch.start();