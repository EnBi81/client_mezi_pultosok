import { useColorTheme } from '../colors_themes/hooks/useColorTheme';
import { View } from 'react-native';

export const AppBackground = ({ children }: { children: React.ReactNode }) => {
  const { colors } = useColorTheme();

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: colors.background.fullContrast,
      }}
    >
      {children}
    </View>
  );
};
