import { useEffect, useState } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { useColorTheme } from '../colors_themes/useColorTheme';

export const useUIEffects = () => {
  const { colors } = useColorTheme();
  const [ripple, setRipple] = useState(TouchableNativeFeedback.Ripple(colors.effect.ripple, false));

  useEffect(() => {
    setRipple(TouchableNativeFeedback.Ripple(colors.effect.ripple, false));
  }, [colors]);

  return {
    ripple,
  };
};
