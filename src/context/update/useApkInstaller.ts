import { NativeModules } from 'react-native';
const { InstallModule } = NativeModules;

export const useApkInstaller = () => {
  const installApk = (path: string) => {
    const result = InstallModule.installApk(path);

    result.then(() => console.log('Install Apk')).catch((err) => console.error('Could not install the app. ', err));
  };

  return {
    install: installApk,
  };
};
