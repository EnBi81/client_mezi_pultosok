import { CURRENT_APK_VERSION } from '../../constants';
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useApkUpdater } from '../../hooks/apkUpdater/useApkUpdater';
import { useLocale } from '../../locale/hooks/useLocale';
import { formatString } from '../../utils';

export const UpdateButton = () => {
  const {
    latestApkVersion,
    isUpdateAvailable,
    isDownloading,
    isDownloadCompleted,
    downloadPercent,
    downloadAndInstall,
  } = useApkUpdater();

  const canDownloadBePressed = !isDownloading && !isDownloadCompleted;

  const { l } = useLocale();

  return (
    <View>
      {isUpdateAvailable && (
        <TouchableOpacity
          style={{
            ...styles.updateButtonWrapper,
            backgroundColor:
              isDownloading || isDownloadCompleted ? '#ccc' : '#62a4ff',
          }}
          onPress={() => downloadAndInstall()}
        >
          <View
            style={{
              ...styles.updateButtonProgressBar,
              width: `${downloadPercent ?? 0}%`,
            }}
          ></View>
          <Text style={styles.updateButton}>
            {isDownloading &&
              formatString(l.update.downloading, downloadPercent)}
            {canDownloadBePressed &&
              formatString(
                l.update.updateTo,
                latestApkVersion,
                CURRENT_APK_VERSION,
              )}
            {isDownloadCompleted &&
              formatString(l.update.installing, latestApkVersion)}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  updateButtonWrapper: {
    width: '100%',
    height: 40,
    backgroundColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  updateButton: {
    backgroundColor: '#00000000',
    fontSize: 20,
    color: 'black',
  },
  updateButtonProgressBar: {
    height: '100%',
    backgroundColor: '#62a4ff',
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
