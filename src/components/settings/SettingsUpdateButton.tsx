import { SettingsOptionContainer } from './SettingsOptionContainer';
import { Icon } from '../icons/Icon';
import { useApkUpdater } from '../../hooks/useApkUpdater';
import { useLocale } from '../../hooks/useLocale';
import { formatString } from '../../utils/utils';
import { ActivityIndicator, View } from 'react-native';
import { useEffect, useState } from 'react';

export const SettingsUpdateButton = () => {
  const { latestApkVersion, isDownloading, isDownloadCompleted, downloadPercent, downloadAndInstall, install } =
    useApkUpdater();
  const { l } = useLocale();

  const [icon, setIcon] = useState(<Icon name={'update'} />);

  useEffect(() => {
    if (!isDownloading && !isDownloadCompleted) return;

    if (isDownloadCompleted) {
      setIcon(<Icon name={'install-mobile'} />);
      return;
    }

    if (isDownloading) {
      setIcon(<ActivityIndicator />);
    }
  }, [isDownloading, isDownloadCompleted]);

  let text;

  if (isDownloadCompleted) {
    text = formatString(l.update.installing, latestApkVersion);
  } else if (isDownloading) {
    text = formatString(l.update.downloading, downloadPercent);
  } else {
    text = formatString(l.update.updateTo, latestApkVersion);
  }

  return (
    <View>
      <SettingsOptionContainer
        icon={icon}
        title={text}
        onPress={() => {
          if (isDownloading) return;
          if (isDownloadCompleted) install();
          else downloadAndInstall();
        }}
      />
    </View>
  );
};
