import { API_ENDPOINT } from '../utils/constants';

export const endpoints = {
  latestApkVersion: (): Promise<string> => {
    return new Promise((resolve, reject) => {
      fetch(`${API_ENDPOINT}/apk-version`)
        .then((data) => {
          if (!data.ok) throw new Error('Error while checking apk version: ' + data.statusText);

          return data.text();
        })
        .then((latestApkVersion) => {
          if (/[.\d]*/.test(latestApkVersion)) {
            resolve(latestApkVersion);
          } else {
            reject('Invalid APK version received.');
          }
        })
        .catch((err) => {
          console.error('Error while requesting latest apk version: ', err);
        });
    });
  },
};
