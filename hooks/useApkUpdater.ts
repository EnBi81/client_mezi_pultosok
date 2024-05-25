import {useApkUpdateChecker} from "./apkUpdater/useApkUpdateChecker";
import {useApkDownloader} from "./apkUpdater/useApkDownloader";
import {useApkInstaller} from "./apkUpdater/useApkInstaller";
import {useEffect} from "react";
import Toast from "react-native-toast-message";

export const useApkUpdater = () => {
    const { latestApkVersion, isUpdateAvailable } = useApkUpdateChecker();
    const { isDownloadCompleted, downloadLatestApk, downloadPercent, downloadError, latestApkDownloadPath } = useApkDownloader();
    const { install } = useApkInstaller();

    useEffect(() => {
        if(!isDownloadCompleted)
            return;

        install(latestApkDownloadPath.fullPath);
    }, [isDownloadCompleted])

    useEffect(() => {
        if(downloadError === undefined)
            return;

        Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Error occured while downloading the update.',
            text2: downloadError,
        });
    }, [downloadError])

    async function downloadAndInstall(){
        await downloadLatestApk();
    }

    return {
        latestApkVersion,
        isUpdateAvailable,
        downloadAndInstall: () => downloadAndInstall(),
        isDownloading: !isNaN(downloadPercent ?? NaN) && !isDownloadCompleted,
        downloadPercent,
    }
}