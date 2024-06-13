import { useEffect, useState } from 'react';
import { CURRENT_APK_VERSION } from '../../utils/constants';
import { endpoints } from '../../api/endpoints';

export const useApkUpdateChecker = () => {
  const [latestApkVersion, setLatestApkVersion] = useState<string>();
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isUpdateAvailableChecked, setIsUpdateAvailableChecked] = useState(false);

  // request latest apk version
  useEffect(() => {
    endpoints.latestApkVersion().then((latestApkVersion) => {
      setLatestApkVersion(latestApkVersion);
      setIsUpdateAvailableChecked(true);
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
    isUpdateAvailableChecked,
  };
};
