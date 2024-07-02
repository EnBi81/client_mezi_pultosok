import { TouchableNativeFeedback, TouchableOpacity, ViewStyle } from 'react-native';
import { OSPlatform } from '../utils/OSPlatform';
import { UIEffectsProps, useUIEffects } from '../hooks/useUIEffects';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useColorTheme } from '../hooks/useColorTheme';

interface TouchableProps { 
    children: React.ReactNode;
    onPress?: () => void;
    onLongPress?: () => void;
    style?: ViewStyle;
    uiEffectProps?: UIEffectsProps
}

export const Touchable = ({ 
    children, 
    onPress, 
    onLongPress,
    style,
    uiEffectProps
}: TouchableProps) => {
  const { ripple } = useUIEffects(uiEffectProps);
  const { colors } = useColorTheme();

  if (OSPlatform.is.android) {
    return (
      <TouchableNativeFeedback 
        style={style} 
        background={ripple} 
        onPress={onPress} 
        onLongPress={onLongPress}>
        {children}
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableHighlight 
      activeOpacity={colors.effect.press.opacity}
      underlayColor={colors.effect.press.overlay}
      style={style} 
      onPress={onPress} 
      onLongPress={onLongPress}>
      {children}
    </TouchableHighlight>
  );
};