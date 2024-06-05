import { useEffect, useState } from 'react';
import { API_ENDPOINT, CURRENT_APK_VERSION } from '../../constants';

export const useApkUpdateChecker = () => {
  const [latestApkVersion, setLatestApkVersion] = useState<string>();
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  // request latest apk version
  useEffect(() => {
    fetch(`${API_ENDPOINT}/apk-version`)
      .then((data) => {
        if (!data.ok)
          throw new Error(
            'Error while checking apk version: ' + data.statusText,
          );

        return data.text();
      })
      .then((latestApkVersion) => {
        setLatestApkVersion(latestApkVersion);
      })
      .catch((err) => {
        console.error('Error while requesting latest apk version: ', err);
      });
  }, []);

  // check the current version with the latest
  useEffect(() => {
    if (!latestApkVersion) return;

    if (CURRENT_APK_VERSION !== latestApkVersion) setIsUpdateAvailable(true);
  }, [latestApkVersion]);

  return {
    latestApkVersion,
    isUpdateAvailable,
  };
};
