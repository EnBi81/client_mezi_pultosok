import { Animated, Easing, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { useRef } from 'react';
import { useGradientPalette } from '../../colors_themes/hooks/useGradientPalette';
import { useColorTheme } from '../../colors_themes/hooks/useColorTheme';

export const SettingsCircularButton = ({ onPress }: { onPress: () => void }) => {
  const { colorPalette, gradientEffects } = useGradientPalette();
  const { isLightTheme, colors } = useColorTheme();

  const scaleValue = useRef(new Animated.Value(1)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;

  const startRotation = () => {
    rotateValue.setValue(0);
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  };

  const stopRotation = () => {
    rotateValue.stopAnimation();
  };

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      friction: 3,
      useNativeDriver: true,
    }).start();
    startRotation();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
    stopRotation();
  };

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.maxSize}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
        <Animated.View
          style={[
            styles.maxSize,
            styles.circle,
            styles.shadowContainer,
            {
              backgroundColor: colors.background.settings,
              shadowColor: colors.card.shadow,
              borderColor: '#ffffff30',
              borderWidth: 1,
            },
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          <MaskedView
            style={[styles.maxSize]}
            maskElement={
              <Animated.View style={[styles.maxSize, styles.center, { transform: [{ rotate }] }]}>
                <Icon style={styles.icon} name='settings' size={45} color='#000' />
              </Animated.View>
            }
          >
            <LinearGradient
              style={styles.maxSize}
              colors={isLightTheme ? colorPalette.gradient : gradientEffects.brighten(25)}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            ></LinearGradient>
          </MaskedView>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.85,
    elevation: 8,
  },
  maxSize: {
    width: '100%',
    height: '100%',
  },
  circle: {
    borderRadius: 9999,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
