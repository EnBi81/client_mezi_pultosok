import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { useGradientPalette } from '../../../hooks/useGradientPalette';

export const GradientBorder = ({
  children,
  borderWidth,
  borderRadius,
}: {
  borderWidth: number;
  borderRadius: number;
  children: React.ReactNode;
}) => {
  if (borderWidth < 0) throw new Error('borderWidth cannot be smaller than 0.');

  const { colorPalette } = useGradientPalette();

  return (
    <View style={[styles.gradientContainer, { borderRadius: borderRadius }]}>
      <LinearGradient
        colors={colorPalette.gradient} // Define your gradient colors here
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ padding: borderWidth, borderRadius: borderRadius }}
      >
        <View
          style={[
            styles.gradientInnerContainer,
            { borderRadius: borderRadius - borderWidth },
          ]}
        >
          {children}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    overflow: 'hidden',
    width: '100%',
  },
  gradientInnerContainer: {
    borderRadius: 10,
    backgroundColor: '#f6f6f6',
    width: '100%',
    overflow: 'hidden',
  },
});
