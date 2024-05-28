import {useEffect, useState} from "react";
import RNFS from 'react-native-fs';
import {API_ENDPOINT} from '../../constants'

export const useApkDownloader = () => {
    const [latestApkDownloadPath] = useState({
        fileName: 'mezi_pultos_garda_update.apk',
        fullPath: `${RNFS.ExternalDirectoryPath}/mezi_pultos_garda_update.apk`
    });
    const latestApkUrl = `${API_ENDPOINT}/apps/app-latest-release.apk`;

    const [downloadPercent, setDownloadPercent] = useState<number>();
    const [downloadError, setDownloadError] = useState<string>();
    const [isDownloadCompleted, setIsDownloadCompleted] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false)

    const downloadApk = async () => {
        if(isDownloading)
            return;

        setIsDownloading(true);

        try {
            const downloadDest = latestApkDownloadPath.fullPath;

            const download = RNFS.downloadFile({
                fromUrl: latestApkUrl,
                toFile: downloadDest,
                progress: (res) => {
                    const percent = (res.bytesWritten / res.contentLength) * 100;
                    setDownloadPercent(Math.round(percent));
                },
            });

            const result = await download.promise;
            if (result.statusCode === 200) {
                setIsDownloadCompleted(true);
            } else {
                setDownloadError('Failed to download APK: ' + result.statusCode);
                console.error('Failed to download APK: ' + result.statusCode)
            }
        } catch (error) {
            setDownloadError('Failed to download APK: ' + JSON.stringify(error));
            console.error(error);
        }

        setIsDownloading(false);
    };

    // delete the apk file if exists
    useEffect(() => {
        RNFS.exists(latestApkDownloadPath.fullPath)
            .then(exists => {
                if(!exists)
                    return;

                RNFS.unlink(latestApkDownloadPath.fullPath)
                    .then(() => {
                        console.log('FILE DELETED');
                    })
                    // `unlink` will throw an error, if the item to unlink does not exist
                    .catch((err) => {
                        console.log(err.message);
                    });
            })
    }, [])

    return {
        isDownloadCompleted,
        downloadPercent,
        downloadError,
        downloadLatestApk: downloadApk,
        latestApkDownloadPath
    }
}