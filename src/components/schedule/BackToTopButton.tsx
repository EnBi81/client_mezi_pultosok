import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { Icon } from '../Icon';
import { useUIEffects } from '../../hooks/useUIEffects';
import LinearGradient from 'react-native-linear-gradient';
import { useGradientPalette } from '../../hooks/useGradientPalette';
import { useColorTheme } from '../../hooks/useColorTheme';
import MaskedView from '@react-native-masked-view/masked-view';

export const BackToTopButton = ({ onPress }: { onPress: (e) => void }) => {
  const { ripple } = useUIEffects();
  const { colorPalette, gradientEffects } = useGradientPalette();
  const { isLightTheme, colors } = useColorTheme();

  return (
    <View>
      <View
        style={[
          styles.circularWrapper,
          styles.shadowContainer,
          {
            backgroundColor: colors.background.settings,
            shadowColor: colors.card.shadow,
            borderColor: '#ffffff30',
            borderWidth: 1,
          },
        ]}
      >
        <TouchableNativeFeedback background={ripple} style={styles.maxSize} onPress={onPress}>
          <View style={styles.maxSize}>
            <MaskedView
              style={styles.maxSize}
              maskElement={
                <View style={[styles.maxSize, styles.center]}>
                  <Icon name={'chevron-up-circle'} provider={'material-community'} size={30} />
                </View>
              }
            >
              <LinearGradient
                style={styles.maxSize}
                colors={isLightTheme ? colorPalette.gradient : gradientEffects.brighten(25)}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              ></LinearGradient>
            </MaskedView>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circularWrapper: {
    borderRadius: 9999,
    width: 45,
    height: 45,
    overflow: 'hidden',
  },
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
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
