import {
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { useApkUpdater } from '../../hooks/apkUpdater/useApkUpdater';
import { useLocale } from '../../locale/hooks/useLocale';
import { SettingsCircularButton } from './SettingsCircularButton';
import { useNavigation } from '../../navigation/useNavigation';
import { formatString } from '../../utils';
import { useUIEffects } from '../../hooks/useUIEffects';
import React, { useEffect, useRef } from 'react';
import { LinearGradient } from 'react-native-linear-gradient';
import { useGradientPalette } from '../../hooks/useGradientPalette';

export const SettingsUpdateWrapper = () => {
  const {
    latestApkVersion,
    isUpdateAvailable,
    isDownloading,
    isDownloadCompleted,
    downloadPercent,
    downloadAndInstall,
    install,
  } = useApkUpdater();

  const canDownloadBePressed = !isDownloading && !isDownloadCompleted;

  const { l } = useLocale();
  const { navigate } = useNavigation();
  const { ripple } = useUIEffects();
  const { colorPalette } = useGradientPalette();

  const componentWidth = Dimensions.get('window').width - 40; // 40: padding from both sides

  // animate the width of the update section
  const animatedWidth = useRef(new Animated.Value(60)).current;
  useEffect(() => {
    if (isUpdateAvailable) {
      Animated.timing(animatedWidth, {
        toValue: componentWidth,
        duration: 500,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start();
    }
  }, [isUpdateAvailable]);

  const handleUpdate = () => {
    if (!isDownloadCompleted) downloadAndInstall();
    else install();
  };

  return (
    <View>
      {!isUpdateAvailable && (
        <View
          pointerEvents={'box-none'}
          style={{
            width: 60,
            height: 60,
            position: 'absolute',
            right: 0,
            bottom: 0,
          }}
        >
          <SettingsCircularButton onPress={() => navigate.to.settings()} />
        </View>
      )}

      {isUpdateAvailable && (
        <View
          style={[
            styles.maxSize,
            styles.shadowContainer,
            { flexDirection: 'row', justifyContent: 'flex-end' },
          ]}
        >
          <Animated.View
            style={{
              width: animatedWidth,
              height: 60,
              backgroundColor: 'white',
              borderRadius: 9999,
              flexDirection: 'row',
              justifyContent: 'space-between',
              overflow: 'hidden',
            }}
          >
            <TouchableNativeFeedback
              background={ripple}
              onPress={() => handleUpdate()}
            >
              <View
                style={[
                  {
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}
              >
                <Text
                  style={{
                    color: 'black',
                    fontSize: 24,
                    fontWeight: 'bold',
                    zIndex: 1,
                  }}
                >
                  {isDownloading &&
                    formatString(l.update.downloading, downloadPercent)}
                  {canDownloadBePressed &&
                    formatString(l.update.updateTo, latestApkVersion)}
                  {isDownloadCompleted &&
                    formatString(l.update.installing, latestApkVersion)}
                </Text>
                <View style={{ width: 60 }}></View>
                {isDownloading && (
                  <LinearGradient
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'red',
                    }}
                    colors={colorPalette.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  ></LinearGradient>
                )}

                <View
                  style={{
                    ...styles.updateButtonProgressBar,
                    width: `${100 - downloadPercent ?? 0}%`,
                  }}
                ></View>
              </View>
            </TouchableNativeFeedback>
            <View
              style={{
                width: 60,
                height: 60,
                position: 'absolute',
                right: 0,
              }}
            >
              <SettingsCircularButton onPress={() => navigate.to.settings()} />
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  maxSize: {
    width: '100%',
    height: '100%',
  },
  shadowContainer: {
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.85,
    elevation: 8,
  },
  updateButtonProgressBar: {
    height: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
