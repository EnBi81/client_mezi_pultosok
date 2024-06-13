import { ApkUpdateContext } from './ApkUpdateContext';
import { useApkUpdaterContextHook } from './useApkUpdatedContextHook';
import { ReactAppMessageQueue } from '../../utils/ReactAppMessageQueue';
import { useEffect, useState } from 'react';

export const ApkUpdateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [updateAsSoonAsAvailable, setUpdateAsSoonAsAvailable] = useState(false);
  const updater = useApkUpdaterContextHook();

  useEffect(() => {
    const handler = ReactAppMessageQueue.appUpdate.addQueueHandler(() => {
      setUpdateAsSoonAsAvailable(true);
    });
    return () => handler.removeHandler();
  }, []);

  useEffect(() => {
    if (!updater.isUpdateAvailableChecked) return;
    if (!updateAsSoonAsAvailable) return;
    if (!updater.isUpdateAvailable) return;

    updater.downloadAndInstall();
  }, [updater.isUpdateAvailableChecked, updater.isUpdateAvailable, updateAsSoonAsAvailable]);

  return <ApkUpdateContext.Provider value={updater}>{children}</ApkUpdateContext.Provider>;
};
