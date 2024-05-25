import {useEffect, useState} from "react";
import {API_ENDPOINT, CURRENT_APK_VERSION} from '../../constants'
import RNFS from 'react-native-fs';
import { Platform, Linking } from 'react-native';

export const useApkUpdateChecker = () => {

    const [latestApkVersion, setLatestApkVersion] = useState<string>();
    const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

    // request latest apk version
    useEffect(() => {
        fetch(`${API_ENDPOINT}/apk-version`)
            .then(data => {
                if(!data.ok)
                    throw new Error('Error while checking apk version: ' + data.statusText);

                return data.text();
            })
            .then(latestApkVersion => {
                setLatestApkVersion(latestApkVersion);
            })
            .catch(err => {
                console.error('Error while requesting latest apk version: ', err);
            })
    }, []);

    // check the current version with the latest
    useEffect(() => {
        if(!latestApkVersion)
            return;

        if(CURRENT_APK_VERSION !== latestApkVersion)
            setIsUpdateAvailable(true);
    }, [latestApkVersion])



    const installAPK = (apkPath) => {
        if (Platform.OS === 'android') {
            RNInstallApk.install(apkPath)
                .then(() => {
                    // Delete the APK file after successful installation
                    RNFS.unlink(apkPath)
                        .then(() => {
                            console.log('APK file deleted');
                        })
                        .catch((err) => {
                            console.error('Failed to delete APK file', err);
                        });
                })
                .catch((err) => {
                    console.error('Failed to install APK', err);
                });
        } else {
            Linking.openURL(apkPath); // For non-Android platforms, handle accordingly
        }
    };

    return {
        latestApkVersion,
        isUpdateAvailable
    }
}