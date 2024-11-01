import { StyleSheet, View, Text, TouchableNativeFeedback, Animated, Dimensions, Easing } from 'react-native';
import { useApkUpdater } from '../../hooks/useApkUpdater';
import { useLocale } from '../../hooks/useLocale';
import { SettingsCircularButton } from './SettingsCircularButton';
import { useNavigation } from '../../hooks/useNavigation';
import { formatString } from '../../utils/utils';
import { useUIEffects } from '../../hooks/useUIEffects';
import React, { useEffect, useRef, useState } from 'react';
import { LinearGradient } from 'react-native-linear-gradient';
import { useGradientPalette } from '../../hooks/useGradientPalette';
import { useColorTheme } from '../../hooks/useColorTheme';
import { BackToTopButton } from './BackToTopButton';

export const SettingsUpdateWrapper = ({
  showScrollToTopButton,
  scrollToTop,
}: {
  showScrollToTopButton: boolean;
  scrollToTop: () => void;
}) => {
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
  const { colors } = useColorTheme();
  const [scrollToTopY] = useState(new Animated.Value(0));

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

  useEffect(() => {
    if (showScrollToTopButton) {
      // User is scrolling up and has scrolled more than 100 pixels
      Animated.timing(scrollToTopY, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // User is scrolling down or hasn't scrolled past 100 pixels
      Animated.timing(scrollToTopY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showScrollToTopButton]);

  const scrollToTopTranslateY = scrollToTopY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  });

  return (
    <View>
      {!isUpdateAvailable && (
        <View>
          <View pointerEvents={'box-none'} style={styles.backToTopButtonWrapper}>
            <Animated.View style={[{ transform: [{ translateY: scrollToTopTranslateY }] }]}>
              <BackToTopButton onPress={scrollToTop} />
            </Animated.View>
          </View>

          <View pointerEvents={'box-none'} style={styles.circularButtonContainer}>
            <SettingsCircularButton onPress={() => navigate.to.settings()} />
          </View>
        </View>
      )}

      {isUpdateAvailable && (
        <View
          style={[
            styles.maxSize,
            styles.shadowContainer,
            {
              shadowColor: colors.card.shadow,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            },
          ]}
        >
          <View pointerEvents={'box-none'} style={styles.backToTopButtonWrapper}>
            <Animated.View style={[{ transform: [{ translateY: scrollToTopTranslateY }] }]}>
              <BackToTopButton onPress={scrollToTop} />
            </Animated.View>
          </View>
          <Animated.View
            style={{
              width: animatedWidth,
              height: 60,
              backgroundColor: colors.background.component,
              borderRadius: 9999,
              flexDirection: 'row',
              justifyContent: 'space-between',
              overflow: 'hidden',
              borderColor: '#ffffff20',
              borderWidth: 1,
            }}
          >
            <TouchableNativeFeedback background={ripple} onPress={() => handleUpdate()}>
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
                    color: colors.text.main,
                    fontSize: 24,
                    fontWeight: 'bold',
                    zIndex: 1,
                  }}
                >
                  {isDownloading && formatString(l.update.downloading, downloadPercent)}
                  {canDownloadBePressed && formatString(l.update.updateTo, latestApkVersion)}
                  {isDownloadCompleted && formatString(l.update.installing, latestApkVersion)}
                </Text>
                <View style={{ width: 60 }}></View>
                {isDownloading && (
                  <LinearGradient
                    style={[
                      styles.maxSize,
                      {
                        position: 'absolute',
                      },
                    ]}
                    colors={colorPalette.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  ></LinearGradient>
                )}

                <View
                  style={{
                    ...styles.updateButtonProgressBar,
                    backgroundColor: colors.background.component,
                    width: `${100 - downloadPercent ?? 0}%`,
                  }}
                ></View>
              </View>
            </TouchableNativeFeedback>

            <View pointerEvents={'box-none'} style={styles.circularButtonContainer}>
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
  circularButtonContainer: {
    width: 60,
    height: 60,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  shadowContainer: {
    shadowRadius: 10,
    shadowOffset: { width: 2, height: 4 },
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
  backToTopButtonWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 60,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
