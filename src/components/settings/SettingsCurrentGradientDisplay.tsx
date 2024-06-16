import { LinearGradient } from 'react-native-linear-gradient';
import { toast } from '../../utils/utils';
import { useGradientPalette } from '../../hooks/useGradientPalette';
import { useLocale } from '../../hooks/useLocale';
import { useUIEffects } from '../../hooks/useUIEffects';
import { TouchableNativeFeedback, View, Text } from 'react-native';
import { useEnvironment } from '../../hooks/useEnvironment';
import { useEffect, useState } from 'react';

export const SettingsCurrentGradientDisplay = () => {
  const { colorPalette } = useGradientPalette();
  const { l } = useLocale();
  const { ripple } = useUIEffects({ lightColorOverride: '#ffffff30' });
  const { isDebug, setDebug } = useEnvironment();
  const [gradientText, setGradientText] = useState(colorPalette.gradientName);

  const [debugCounter, setDebugCounter] = useState({ press: 0, longPress: 0 });

  const onLongPress = () => {
    toast(`${l.settings.currentGradient}: ${colorPalette.gradientName}`);
    setDebugCounter((counter) => ({ ...counter, longPress: counter.longPress + 1 }));
  };

  const onPress = () => {
    if (debugCounter.longPress > 0) {
      setDebugCounter((counter) => ({ ...counter, press: counter.press + 1 }));
    }
  };

  useEffect(() => {
    if (isDebug) return;

    const pressToActivateDebug = 10;

    if (debugCounter.press < pressToActivateDebug - 5) {
      return;
    }

    if (debugCounter.press < pressToActivateDebug) {
      setGradientText(`${pressToActivateDebug - debugCounter.press} clicks to debug.`);
      return;
    }

    setDebug();
    setGradientText(colorPalette.gradientName);
    toast('Debug mode activated');
  }, [debugCounter]);

  return (
    <View style={{ borderRadius: 12, overflow: 'hidden' }}>
      <LinearGradient
        colors={colorPalette.gradient} // Define your gradient colors here
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableNativeFeedback background={ripple} onPress={onPress} onLongPress={onLongPress}>
          <View style={{ padding: 5, paddingVertical: 20 }}>
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ color: colorPalette.textColor, fontSize: 20, fontWeight: 'bold' }}>{gradientText}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </LinearGradient>
    </View>
  );
};
