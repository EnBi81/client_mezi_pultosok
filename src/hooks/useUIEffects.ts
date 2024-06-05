import { useState } from 'react';
import { TouchableNativeFeedback } from 'react-native';

export const useUIEffects = () => {
  const [ripple] = useState(TouchableNativeFeedback.Ripple('#ccc', false));

  return {
    ripple,
  };
};
