import { useEffect } from 'react';
import {useApkUpdateChecker} from "./useApkUpdateChecker";
import {useApkDownloader} from "./useApkDownloader";
import {useApkInstaller} from "./useApkInstaller";

export const useApkUpdaterContextHook = () => {
    const { latestApkVersion, isUpdateAvailable } = useApkUpdateChecker();
    const {
        isDownloadCompleted,
        downloadLatestApk,
        downloadPercent,
        downloadError,
        latestApkDownloadPath,
    } = useApkDownloader();
    const { install } = useApkInstaller();

    useEffect(() => {
        if (!isDownloadCompleted) return;

        install(latestApkDownloadPath.fullPath);
    }, [isDownloadCompleted]);

    useEffect(() => {
        if (downloadError === undefined) return;

        console.error(
            'Error occured while downloading the update: ' + downloadError,
        );
    }, [downloadError]);

    async function downloadAndInstall() {
        await downloadLatestApk();
    }

    return {
        latestApkVersion,
        isUpdateAvailable,
        downloadAndInstall: () => downloadAndInstall(),
        install: () => install(latestApkDownloadPath.fullPath),
        isDownloading: !isNaN(downloadPercent ?? NaN) && !isDownloadCompleted,
        isDownloadCompleted,
        downloadPercent,
    };
};
