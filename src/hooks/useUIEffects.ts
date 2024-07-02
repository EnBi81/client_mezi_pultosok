import { useEffect, useState } from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { useColorTheme } from './useColorTheme';

export interface UIEffectsProps {
  darkColorOverride?: string | undefined;
  lightColorOverride?: string | undefined;
}

export const useUIEffects = (props: UIEffectsProps | undefined = undefined) => {
  const { isLightTheme, colors } = useColorTheme();
  const [ripple, setRipple] = useState(TouchableNativeFeedback.Ripple(colors.effect.ripple, false));

  useEffect(() => {
    if (props?.lightColorOverride && isLightTheme)
      setRipple(TouchableNativeFeedback.Ripple(props.lightColorOverride, false));
    else if (props?.darkColorOverride && !isLightTheme)
      setRipple(TouchableNativeFeedback.Ripple(props.darkColorOverride, false));
    else setRipple(TouchableNativeFeedback.Ripple(colors.effect.ripple, false));
  }, [isLightTheme, colors, props?.darkColorOverride, props?.lightColorOverride]);

  return {
    ripple,
  };
};
