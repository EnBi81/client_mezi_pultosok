import { CURRENT_APK_VERSION } from '../constants';
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useApkUpdater } from '../hooks/useApkUpdater';

export const UpdateButton = () => {
  const {
    latestApkVersion,
    isUpdateAvailable,
    isDownloading,
    isDownloadCompleted,
    downloadPercent,
    downloadAndInstall,
  } = useApkUpdater();

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
            {isDownloading && `Downloading update... (${downloadPercent}%)`}
            {!isDownloading &&
              !isDownloadCompleted &&
              `Update to ${latestApkVersion} (current: ${CURRENT_APK_VERSION})`}
            {isDownloadCompleted && `Installing ${latestApkVersion}...`}
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
